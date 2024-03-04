import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { gasolinera } from 'src/app/modelos/gasolinera';
import { sector } from 'src/app/modelos/sector';
import { DashService } from 'src/app/servicios/dash.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-gasolinera',
  templateUrl: './reporte-gasolinera.component.html',
  styleUrls: ['./reporte-gasolinera.component.css'],
})
export class ReporteGasolineraComponent {
  ngOnInit() {
    this.getSectores();
    this.inicializarDropdown();
    this.actualizarFecha();
    this.getGasolinerasAll();
  }

  constructor(
    private servicio: ReporteService,
    private http: HttpClient,
    private dash: DashService
  ) {}

  fechaIni: string = '';
  fechaFin: string = '';
  fecha: string = '';

  listBrigada: boolean = false;
  listOrden: boolean = false;

  msgFechaVacia: boolean = false;
  msgFechaMayor: boolean = false;
  msgFechaMayorP: boolean = false;
  msgNoResultado: boolean = false;
  seleccionReporte: string = '0';

  brigada: number = 0;
  selectedOrden: any = 'desc';
  selectedTiempo: number = 0.5;
  nombreTiempo: string = '';

  todoReporte: Array<control> = [];
  reportesFiltrados: Array<control> = [];
  sectores: Array<sector> = [];
  gasolineras: Array<gasolinera> = [];

  totalGalones: number = 0;
  totalKilometrajeIni: number = 0;
  totalKilometrajeAct: number = 0;
  precio_galon: number = 0;
  buscadorPlaca: string = '';
  msgBuscadorPlacaVacio: boolean = false;
  vista1Visible: boolean = true;
  vista2Visible: boolean = false;
  selectedGasolinera: number = 1;
  nombreBrigada: string = '';

  options: Array<any> = [];
  gasolinera: Array<any> = [];

  getGasolinerasAll() {
    this.dash.getGasolineras().subscribe((listado) => {
      this.gasolineras = listado;

      this.gasolinerasOption();
    });
  }

  actualizarFecha() {
    this.http.get<any>('https://worldtimeapi.org/api/ip').subscribe(
      (response) => {
        let fechaUtc = new Date(response.utc_datetime);
        fechaUtc.setHours(fechaUtc.getHours() - 4);

        const dia = fechaUtc.getDate().toString().padStart(2, '0');
        const mes = (fechaUtc.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaUtc.getFullYear();

        this.fecha = `${dia}/${mes}/${anio}`;
      },
      (error) => {
        console.error('Error al obtener la fecha externa:', error);
      }
    );
  }

  @ViewChild('table', { static: false })
  table!: ElementRef;

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'report.xlsx');
  }

  getSectores() {
    this.dash.getSectores().subscribe((obj) => {
      this.sectores = obj;
      this.option();
      this.clickedFiltro();
    });
  }

  kilometraje_rec: number = 0;
  private calcularTotales() {
    this.totalGalones = this.todoReporte.reduce(
      (total, item) => total + (item.combustible || 0),
      0
    );
    this.totalKilometrajeIni = this.todoReporte.reduce(
      (total, item) => total + (item.kilometraje || 0),
      0
    );
    this.totalKilometrajeAct = this.todoReporte.reduce(
      (total, item) => total + (item.kilometraje_act || 0),
      0
    );
    this.precio_galon = this.todoReporte.reduce(
      (total, item) => total + (item.precio_galon || 0),
      0
    );

    this.kilometraje_rec = this.todoReporte.reduce(
      (total, item) => total + (item.kilometraje_rec || 0),
      0
    );
  }

  inicializarDropdown() {
    // boton de brigada
    const dropdownToggleButton = document.getElementById(
      'dropdownHelperRadioButton'
    );
    const dropdownContainer = document.getElementById('dropdownHelperRadio');

    if (dropdownToggleButton && dropdownContainer) {
      dropdownToggleButton.addEventListener('click', () => {
        dropdownContainer.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownToggleButton.contains(target) &&
          !dropdownContainer.contains(target)
        ) {
          dropdownContainer.classList.add('hidden');
        }
      });
    }

    // boton de orden
    const ordenBoton = document.getElementById('ordenButton');
    const ordenlist = document.getElementById('orden');

    if (ordenBoton && ordenlist) {
      ordenBoton.addEventListener('click', () => {
        ordenlist.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!ordenBoton.contains(target) && !ordenlist.contains(target)) {
          ordenlist.classList.add('hidden');
        }
      });
    }

    // boton de tiempo

    const dropdownRadioButton = document.getElementById('dropdownRadioButton');
    const dropdownRadio = document.getElementById('dropdownRadio');

    if (dropdownRadioButton && dropdownRadio) {
      dropdownRadioButton.addEventListener('click', () => {
        dropdownRadio.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownRadioButton.contains(target) &&
          !dropdownRadio.contains(target)
        ) {
          dropdownRadio.classList.add('hidden');
        }
      });
    }

    const dropdownFechaButton = document.getElementById('dropdownFecha');
    const dropdownFecha = document.getElementById('dropdown-example');

    if (dropdownFechaButton && dropdownFecha) {
      dropdownFechaButton.addEventListener('click', () => {
        dropdownFecha.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownFechaButton.contains(target) &&
          !dropdownFecha.contains(target)
        ) {
          dropdownFecha.classList.add('hidden');
        }
      });
    }
  }

  reportes() {
    this.servicio.getReporte().subscribe((listado) => {
      this.todoReporte = listado;
    });
  }

  option() {
    this.options = this.sectores.map(({ id_sector, nombre_sec }) => ({
      id: `option${id_sector}`,
      value: id_sector,
      label: nombre_sec,
    }));
  }

  gasolinerasOption() {
    this.gasolinera = this.gasolineras.map(
      ({ id_gasolinera, descripcion }) => ({
        id: `option${id_gasolinera}`,
        value: id_gasolinera,
        label: descripcion,
      })
    );
  }

  firstListVisible: boolean = true;

  // Implementa la función para alternar entre las dos listas
  toggleLists() {
    this.firstListVisible = !this.firstListVisible;
  }

  ordens = [
    { id: 'option8', value: 'asc', label: 'Menor consumo' },
    { id: 'option9', value: 'desc', label: 'Mayor consumo' },
  ];

  tiempos = [
    { id: 'option20', value: 0.5, descripcion: '12 horas' },
    { id: 'option14', value: 1, descripcion: '24 horas' },
    { id: 'option11', value: 7, descripcion: 'Semanal' },
    { id: 'option12', value: 15, descripcion: 'Quicenal' },
    { id: 'option13', value: 30, descripcion: 'Mensual' },
  ];

  clickedFiltro() {
    this.buscadorPlaca = '';
    const brigadaSeleccionada = this.gasolinera.find(
      (option) => option.value === this.selectedGasolinera
    );

    if (brigadaSeleccionada) {
      this.nombreBrigada = brigadaSeleccionada.label;
    } else {
      this.nombreBrigada = 'Seleccione gasolinera';
    }

    switch (this.selectedTiempo) {
      case 0.5:
        this.nombreTiempo = '12 Horas';
        break;
      case 1:
        this.nombreTiempo = '24 Horas';
        break;
      case 7:
        this.nombreTiempo = 'Semanal';
        break;
      case 15:
        this.nombreTiempo = 'Quicenal';

        break;
      case 30:
        this.nombreTiempo = 'Mensual';

        break;
    }

    this.servicio
      .filtroReportesGS(
        this.selectedGasolinera,
        this.selectedOrden,
        this.selectedTiempo
      )
      .subscribe((retorno: any) => {
        this.todoReporte = retorno;
        if (Object.entries(retorno).length === 0) {
          this.msgNoResultado = true;
          setTimeout(() => {
            this.msgNoResultado = false;
          }, 3000);
        }
        this.calcularTotales();
      });
  }

  filtrosFechas() {
    const gasolineraSeleccionada = this.gasolineras.find(
      (gasolineras) => gasolineras.id_gasolinera === this.selectedGasolinera
    );

    if (gasolineraSeleccionada) {
      this.nombreBrigada = gasolineraSeleccionada.descripcion;
    } else {
      this.nombreBrigada = 'Seleccione gasolinera';
    }

    this.buscadorPlaca = '';
    this.selectedTiempo = 0;

    if (!this.fechaIni || !this.fechaFin) {
      this.msgFechaVacia = true;
      setTimeout(() => {
        this.msgFechaVacia = false;
      }, 3000);
      return;
    }

    if (this.fechaIni > this.fechaFin) {
      this.msgFechaMayor = true;
      setTimeout(() => {
        this.msgFechaMayor = false;
      }, 3000);
      return;
    }

    this.servicio
      .filtroReporteFechasGS(
        this.selectedGasolinera,
        this.selectedOrden,
        this.fechaIni,
        this.fechaFin
      )
      .subscribe({
        next: (retorno: any) => {
          if (retorno) {
            this.todoReporte = retorno.resultado;
            if (Object.entries(retorno).length === 0) {
              this.msgNoResultado = true;
              setTimeout(() => {
                this.msgNoResultado = false;
              }, 3000);
            }
            this.calcularTotales();
            this.nombreTiempo = `Desde:  ${retorno.fechaInicio} Hasta: ${retorno.fechaFin}`;
          }
        },
        error: (error: any) => {
          console.error('Error en la llamada al servicio:', error);
        },
        complete: () => {},
      });
  }

  filtroPlaca() {
    if (this.buscadorPlaca == '') {
      this.msgBuscadorPlacaVacio = true;
      setTimeout(() => {
        this.msgBuscadorPlacaVacio = false;
      }, 3000);
      return;
    }

    if (this.fechaIni && this.fechaFin) {
      if (this.fechaIni > this.fechaFin) {
        this.msgFechaMayorP = true;
        setTimeout(() => {
          this.msgFechaMayorP = false;
        }, 3000);
        return;
      }

      this.servicio
        .filtroFechaPlacano(this.buscadorPlaca, this.fechaIni, this.fechaFin)
        .subscribe((retorno: any) => {
          this.todoReporte = retorno;

          if (Object.entries(retorno).length === 0) {
            this.msgNoResultado = true;
            setTimeout(() => {
              this.msgNoResultado = false;
            }, 3000);
          }
          const inicio = this.formatearFecha(this.fechaIni);
          const fin = this.formatearFecha(this.fechaFin);
          this.nombreTiempo = `Desde: ${inicio} Hasta: ${fin}`;
          this.calcularTotales();
          this.nombreBrigada = this.buscadorPlaca;
        });
    } else {
      console.log(this.buscadorPlaca, this.selectedTiempo);

      this.servicio
        .filtroPlacano(this.buscadorPlaca, this.selectedTiempo)
        .subscribe((retorno: any) => {
          this.todoReporte = retorno;
          console.log(retorno);
          if (Object.entries(retorno).length === 0) {
            this.msgNoResultado = true;
            setTimeout(() => {
              this.msgNoResultado = false;
            }, 3000);
          }
          this.calcularTotales();
          this.nombreBrigada = this.buscadorPlaca;
        });
    }
  }

  formatDate(dateTimeString: string): string {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  convertirMayusculas(texto: string) {
    return texto.toUpperCase();
  }

  formatearFecha(fecha: string): string {
    const fechaOriginal = new Date(fecha);

    const dia = fechaOriginal.getUTCDate().toString().padStart(2, '0');
    const mes = (fechaOriginal.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fechaOriginal.getUTCFullYear().toString();

    return `${dia}/${mes}/${anio}`;
  }

  obtenerNombreSector(idSector: number): string {
    const sector = this.sectores.find((g) => g.id_sector === idSector);
    return sector ? sector.nombre_sec : 'Sector Desconocida';
  }

  obtenerNombreGasolinera(idGasolinera: number): string {
    const gasolinera = this.gasolineras.find(
      (g) => g.id_gasolinera === idGasolinera
    );
    return gasolinera ? gasolinera.descripcion : 'Gasolinera Desconocida';
  }
}
