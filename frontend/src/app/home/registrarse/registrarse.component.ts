import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/shared/service-usuario/usuario.service';
import { Route, Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UsuarioModel, Antecedentes } from 'src/app/shared/service-usuario/usuario.model';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  usuario = new UsuarioModel("","","","","","","","","","","","");
  antecedentes: Observable<Antecedentes[]> | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
      this.antecedentes = this.usuarioService.obtenerAntecedentes();
  }

  onSubmit() {

    if (!this.usuario.nom1_user) {
      alert("Por favor, digite su primer nombre");
    }
    else if (!this.usuario.ape1_user) {
      alert("Por favor, digite su primer apellido");
    }
    else if (!this.usuario.correo_sena_user) {
      alert("Por favor, digite su correo electrónico");
    }
    else if (!this.usuario.id_user) {
      alert("Por favor, digite su número de identificación");
    }
    else if (!this.usuario.contrasena) {
      alert("Por favor, digite la contraseña que le pondrá a su cuenta");
    }
    else if (!this.usuario.fk_anteced_salud_sel) {
      alert("Por favor, escoja una de las opciones del selector de antecedentes");
    }
    else {
      this.usuarioService.validarCorreo(this.usuario).subscribe(data => {
        if (data == 'Disponible') {
          this.usuarioService.agregarUsuario(this.usuario).subscribe(data => {
            alert(data)
            this.router.navigate(['../iniciar_sesion'])
          })
        } else {
          alert(data)
        }
      })
    }
  }
}
