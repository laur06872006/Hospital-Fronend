import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { SubirImagenService } from 'src/app/services/subir-Imagen.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private subirImagenService: SubirImagenService) {

    this.usuario = usuarioService.usuarioLogeado;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {

    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        const { nombre, email } = this.perfilForm.value
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardo', 'Perfil Actualizado', 'success')
      }, (err) => {
        Swal.fire('ATENCION', err.error.msg, 'error')
      });
  }

  cambiarImagen(imagen: File) {
    this.imagenSubir = imagen;

    if (!imagen) {
      return this.imagenTemp = '';
    }

    const reader = new FileReader();
    reader.readAsDataURL(imagen);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  subirImagen() {

    this.subirImagenService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.id)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardo', 'Imagen Actualizada', 'success')
      })
      .catch(err => Swal.fire('ATENCION', 'No se pudo subir la Imagen', 'error'))
  }

}
