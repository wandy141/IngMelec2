import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { ControlesService } from 'src/app/servicios/controles.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { DashService } from 'src/app/servicios/dash.service';
import { gasolinera } from 'src/app/modelos/gasolinera';
import { sector } from 'src/app/modelos/sector';
import { ubicacion } from 'src/app/modelos/ubicacion_sector';

@Component({
  selector: 'app-cuadre',
  templateUrl: './cuadre.component.html',
  styleUrls: ['./cuadre.component.css'],
})
export class CuadreComponent implements OnInit {
  public usuario: string | null = localStorage.getItem('usuario');
  controles: Array<control> = [];
  gasolineras: Array<gasolinera> = [];
  sectores: Array<sector> = [];
  ubicaciones: Array<ubicacion> = [];
  controlesSeleccionados: Array<control> = [];
  totalGalones: number = 0;
  totalDinero: number = 0;

  constructor(
    private servicio: ControlesService,
    private reporte: ReporteService,
    private dash: DashService
  ) {}
  ngOnInit(): void {
    this.getControledit(this.usuario);
    this.getGasolinerasAll();
    this.getSectores();
    this.getUbicacionesAll();
  }

  generatePDF() {
    const element: any = document.getElementById('tableToPDF');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('table.pdf');
    });
  }

  getControledit(usuario: string | null) {
    this.servicio.todosControledit(usuario).subscribe((obj: any) => {
      // Itera sobre cada objeto en obj y agrega la propiedad isSelected
      obj.forEach((control: { isSelected: boolean }) => {
        control.isSelected = false; // Agrega la propiedad isSelected y establece en false para cada control
      });

      this.controles = obj; // Asigna los controles con la propiedad isSelected agregada
      
    });
  }


  selectAllChecked: boolean = false;


  selectAllItems() {
    // Verificar si todos los elementos están seleccionados
    const allSelected = this.controles.length > 0 && this.controles.every(item => item.isSelected);
    
    // Actualizar el estado del botón "Seleccionar Todos"
    this.selectAllChecked = allSelected;

    // Actualizar el estado de selección de todos los elementos
    const selectAll = !allSelected;
    this.controles.forEach(item => item.isSelected = selectAll);
    this.controlesSeleccionados = selectAll ? [...this.controles] : [];

    this.alMenosUnoSeleccionado();
    this.sumarTotales();
}






  // Método para manejar el evento de cambio de estado de los checkboxes
  onCheckboxChange(control: control) {
    if (control.isSelected) {
      // Si el control está seleccionado, agrégalo al arreglo de controles seleccionados
      this.controlesSeleccionados.push(control);
      this.sumarTotales();
    } else {
      this.sumarTotales();

      // Si el control está deseleccionado, quítalo del arreglo de controles seleccionados
      this.controlesSeleccionados = this.controlesSeleccionados.filter(
        (c) => c !== control
      );
    }
    

    this.alMenosUnoSeleccionado();
  }

  sumarTotales() {
    this.totalGalones = 0;
    this.totalDinero = 0;

    for (let item of this.controlesSeleccionados) {
      if (item.isSelected) {
        this.totalGalones += item.combustible; // Sumar el combustible del item seleccionado
        this.totalDinero += item.precio_galon; // Sumar el precio del galón del item seleccionado
      }
    }

    return this.totalGalones, this.totalDinero;
  }

  alMenosUnoSeleccionado(): boolean {
    return this.controles.some((item) => item.isSelected) || this.controlesSeleccionados.some((item) => item.isSelected);
}


  
  actualizarCuadre() {
    // Supongamos que tienes un array de objetos 'cuadre' en tu componente
    // Llamas al método 'cuadre' de tu servicio, pasando el array 'cuadre'
    this.reporte.cuadre(this.controlesSeleccionados).subscribe(
      (respuesta) => {},
      (error) => {
        console.log();
        ('Error al actualizar los objetos:');
        // Manejar el error adecuadamente
      }
    );
    this.controlesSeleccionados = [];
    this.generatePDF();
    this.getControledit(this.usuario);

  }

  getSectores() {
    this.dash.getSectores().subscribe((obj) => {
      this.sectores = obj;
    });
  }

  getGasolinerasAll() {
    this.dash.getGasolineras().subscribe((listado) => {
      this.gasolineras = listado;
    });
  }

  getUbicacionesAll() {
    this.dash.getUbicaciones().subscribe((listado) => {
      this.ubicaciones = listado;
    });
  }


  obtenerNombreSector(idSector: number): { nombreSector: string, nombreUbicacion: string } {
    const resultado = {
      nombreSector: 'Sector Desconocido',
      nombreUbicacion: 'Ubicación Desconocida'
    };
  
    const sector = this.sectores.find((g) => g.id_sector === idSector);
    if (sector) {
      const ubicacion = this.ubicaciones.find((u) => u.id_ubicacion === sector.id_ubicacion);
       
      resultado.nombreSector = sector.nombre_sec;
      resultado.nombreUbicacion = ubicacion ? ubicacion.nombre_ubicacion : 'Ubicación Desconocida';
    }
    return resultado;
  }
  

  obtenerNombreGS(idGasolinera: number): string {
    const sector = this.gasolineras.find(
      (g) => g.id_gasolinera === idGasolinera
    );
    return sector ? sector.descripcion : 'Sector Desconocida';
  }
}
