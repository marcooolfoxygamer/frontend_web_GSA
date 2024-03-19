import { Component, OnInit, } from '@angular/core';
import { Observable, toArray } from 'rxjs';
import { Route, Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UsuarioModel } from 'src/app/shared/service-usuario/usuario.model';
import { PlanificadorService } from 'src/app/shared/service-planificador/planificador.service';
import { AsistenciaService } from 'src/app/shared/service-asistencia/asistencia.service';
import { SessionStorageService } from 'src/app/shared/service-session_storage/session-storage.service';
import { UsuarioService } from 'src/app/shared/service-usuario/usuario.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  // existenRutinas: any;
  // existenAsistencias: any;
  // existenUsuarios: any;

  public oculto = true;
  public ocultoPopReporte = true;
  public ocultoPopReporteEspecificoId = true;
  public ocultoPopReporteEspecificoAsistenciaFecha = true;
  public tematicaReporte = "";
  public user_reporte_especifico = "aprendiz";
  public id_usuario_reporte = "";
  public fecha_asistencia = "";
  // public existenRutinas = "";
  // public existenAsistencias = "";
  // public existenUsuarios = "";


  constructor(
    private planificadorService: PlanificadorService,
    private asistenciaService: AsistenciaService,
    private usuarioService: UsuarioService,
    protected sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let rol = this.sessionStorageService.get('rol')

    if (rol != '1') {
      this.sessionStorageService.clear()
    }    
  }

  // Pop-up reportes

  showConfirmBoxReporte(tematicaReporte:string) {
    this.tematicaReporte = tematicaReporte;
    this.ocultoPopReporte = false
  }

  closeConfirmBoxReporte() {
    this.ocultoPopReporte = true
    this.ocultoPopReporteEspecificoId = true
    this.ocultoPopReporteEspecificoAsistenciaFecha = true
  }

  isConfirmReporteGeneral() {
    if (this.tematicaReporte == "rutinas") {

      this.planificadorService.validarExistenciaRegistrosPlanificador().subscribe(data => {
        if (data == "Si hay registros") {

          this.planificadorService.obtenerReporteGeneralRutinas().subscribe(data => {
            let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
            let blob:Blob = data.body as Blob;
            let a:any = document.createElement('a');
            a.download=fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
    
            this.closeConfirmBoxReporte();
          })
        } else {
          alert("Lo sentimos, no hay registros con los cuales generar el reporte")
        }
      })
    }
    else if (this.tematicaReporte == "asistencias") {

      this.asistenciaService.validarExistenciaAsistencias().subscribe(data => {
        if (data == "Si hay registros") {

          this.asistenciaService.obtenerReporteGeneralAsistencias().subscribe(data => {
            let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
            let blob:Blob = data.body as Blob;
            let a:any = document.createElement('a');
            a.download=fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
    
            this.closeConfirmBoxReporte();
          })
        } else {
          alert("Lo sentimos, no hay registros con los cuales generar el reporte")
        }
      })
    }
    else if (this.tematicaReporte == "usuarios") {

      this.usuarioService.validarExistenciaUsuarios().subscribe(data => {
        if (data == "Si hay registros") {

          this.usuarioService.obtenerReporteGeneralUsuarios().subscribe(data => {
            let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
            let blob:Blob = data.body as Blob;
            let a:any = document.createElement('a');
            a.download=fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
    
            this.closeConfirmBoxReporte();
          })
        } else {
          alert("Lo sentimos, no hay registros con los cuales generar el reporte")
        }
      })
    }
  }

  isConfirmReporteEspecificoId() {
    this.ocultoPopReporteEspecificoId = false
    this.ocultoPopReporteEspecificoAsistenciaFecha = true
    this.ocultoPopReporte = true

    if (this.tematicaReporte == "usuarios") {
      this.user_reporte_especifico = 'usuario'
    }
    else {
      this.user_reporte_especifico = 'aprendiz'
    }
  }

  isConfirmReporteEspecificoFecha() {
    this.ocultoPopReporteEspecificoAsistenciaFecha = false
    this.ocultoPopReporteEspecificoId = true
    this.ocultoPopReporte = true
  }
  

  GenerarReporteEspecificoId() {
    if (!this.id_usuario_reporte) {
      alert("Por favor, digite el número de identificación");
    }
    else if (this.tematicaReporte == "rutinas") {

      this.asistenciaService.validarAprendiz(this.id_usuario_reporte).subscribe(data => {
        if (data == 'Si existe') {

          this.planificadorService.validarExistenciaAprendizPlanificador(this.id_usuario_reporte).subscribe(data => {
            if (data == 'Si hay registros') {
              
              this.planificadorService.obtenerReporteEspecificoRutina(this.id_usuario_reporte).subscribe(data => {
                let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
                let blob:Blob = data.body as Blob;
                let a:any = document.createElement('a');
                a.download=fileName;
                a.href = window.URL.createObjectURL(blob);
                a.click();
        
                this.closeConfirmBoxReporte();
                this.id_usuario_reporte = ""
              })
            } else {
              alert("Lo sentimos, no hay registros de rutinas del aprendiz")
            }
          })
        } else {
          alert("La identificación del aprendiz indicada no existe en el sistema. Por favor, inténtelo de nuevo")
        }
      })
    }
    else if (this.tematicaReporte == "asistencias") {

      this.asistenciaService.validarAprendiz(this.id_usuario_reporte).subscribe(data => {
        if (data == 'Si existe') {

          this.asistenciaService.validarExistenciaAsistenciasId(this.id_usuario_reporte).subscribe(data => {
            if (data == 'Si hay registros') {

              this.asistenciaService.obtenerReporteEspecificoAsistenciaId(this.id_usuario_reporte).subscribe(data => {
                let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
                let blob:Blob = data.body as Blob;
                let a:any = document.createElement('a');
                a.download=fileName;
                a.href = window.URL.createObjectURL(blob);
                a.click();
        
                this.closeConfirmBoxReporte();
                this.id_usuario_reporte = ""
              })
            } else {
              alert("Lo sentimos, no hay registros de asistencia del aprendiz al gimnasio")
            }
          })
        } else {
          alert("La identificación del aprendiz indicada no existe en el sistema. Por favor, inténtelo de nuevo")
        }
      })
    }
    else if (this.tematicaReporte == "usuarios") {

      this.usuarioService.validarExistenciaUsuario(this.id_usuario_reporte).subscribe(data => {
        if(data == 'Si existe') {

          this.usuarioService.obtenerReporteEspecificoUsuario(this.id_usuario_reporte).subscribe(data => {
            let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
            let blob:Blob = data.body as Blob;
            let a:any = document.createElement('a');
            a.download=fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
    
            this.closeConfirmBoxReporte();
            this.id_usuario_reporte = ""
          })
        } else {
          alert("La identificación indicada no existe en el sistema. Por favor, inténtelo de nuevo")
        }
      })
    }
  }

  GenerarReporteEspecificoFecha() {
    if (!this.fecha_asistencia) {
      this.fecha_asistencia = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }
    if (this.tematicaReporte == "asistencias") {

      this.asistenciaService.validarExistenciaAsistenciasFecha(this.fecha_asistencia).subscribe(data => {
        if (data == 'Si hay registros') {
          
          this.asistenciaService.obtenerReporteEspecificoAsistenciaFecha(this.fecha_asistencia).subscribe(data => {
            let fileName = data.headers.get('Content-disposition')?.split(';')[1].split('=')[1];
            let blob:Blob = data.body as Blob;
            let a:any = document.createElement('a');
            a.download=fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
    
            this.closeConfirmBoxReporte();
            this.fecha_asistencia = ""
          })
        } else {
          alert("Lo sentimos, no hay registros de asistencia creados en la fecha indicada")
        }
      })
    }
  }

  closeConfirmBoxReporteEspecifico() {
    this.ocultoPopReporteEspecificoId = true
    this.ocultoPopReporteEspecificoAsistenciaFecha = true
    this.ocultoPopReporte = false
    this.id_usuario_reporte = ""
    this.fecha_asistencia = ""
  }
}
