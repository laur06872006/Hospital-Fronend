import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.components.css']
})
export class RegisterComponent {

  public formEnviado = false;
  private passwordIguales = false;

  public formRegistro = this.formBuilder.group({
    nombre: ['Chile Vanegas', [Validators.required, Validators.minLength(3)]],
    email: ['chile@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private UsuarioServ: UsuarioService,
    private router: Router) { }


  crearUsuario() {
    this.formEnviado = true;

    if (!(this.formRegistro.valid && this.formRegistro.get('terminos').value && this.passwordIguales))
      return;

    // Creando Usuario
    this.UsuarioServ.crearUsuario(this.formRegistro.value)
      .subscribe((resp) => {
        // Navegar al Dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        // Manejo de Errores
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error'
        })
      });


  }

  validarCampo(campo: string): boolean {

    if (this.formEnviado && this.formRegistro.get(campo).invalid)
      return true;
    else
      return false;

  }

  validosPassword(): boolean {

    // No se ha enviado el Formulario
    if (!this.formEnviado) {
      return false;
    }

    const pw1 = this.formRegistro.get('password').value;
    const pw2 = this.formRegistro.get('password2').value;

    // No se ha escrito la consetañe
    if (!(pw1.length > 0 && pw2.length > 0)) {
      return false;
    }

    this.passwordIguales = (pw1 === pw2);

    // veridar que sean iguales
    return !this.passwordIguales
  }

  aceptaTerminos(): boolean {
    return this.formEnviado && !this.formRegistro.get('terminos').value
  }

}
