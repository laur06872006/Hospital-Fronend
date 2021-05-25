import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent implements OnInit {

  formEnviado = false;
  auth2: any;

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recuerdame: [false]
  });

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private UsuarioServ: UsuarioService,
    private ngZone: NgZone) { }


  ngOnInit(): void {

    // Dibuja el Boton de GoogleInicio
    this.renderButton();

    let valor = localStorage.getItem('email');

    if (valor) {
      this.formLogin.controls['email'].setValue(valor);
      this.formLogin.controls['recuerdame'].setValue(true);
    } else {
      this.formLogin.controls['email'].setValue('');
      this.formLogin.controls['recuerdame'].setValue(false);
    }

  }

  // Login al Sistema por via Normal
  login() {

    this.formEnviado = true;

    if (!(this.formLogin.valid))
      return;

    this.UsuarioServ.loginUsuario(this.formLogin.value)
      .subscribe(estadoLogin => this.router.navigate(['/dashboard'])
        , err => {
          // Manejo de Errores
          console.warn(err)
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error'
          })
        })

  }

  /////////////////////////
  validarCampo(campo: string): boolean {
    if (this.formEnviado && this.formLogin.get(campo).invalid)
      return true;
    else
      return false;

  }

  ////Dibuja el Boton de Google////
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  ////Configuracion para usar el Login Google/////
  async startApp() {

    await this.UsuarioServ.initGoogle();
    this.auth2 = this.UsuarioServ.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  /////Login por Google//////
  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let id_token = googleUser.getAuthResponse().id_token;
        // Envio el tokenGoogle al Servidor
        this.UsuarioServ.loginGoogle(id_token)
          .subscribe(resp => {
            this.ngZone.run(() => {
              // Navegar al Dashboard
              this.router.navigateByUrl('/');
            })
          });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
