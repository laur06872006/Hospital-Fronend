import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegistroFromulario } from '../interfaces/registro-form.interface';
import { LoginFormulario } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_URL = environment.base_URL;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioLogeado: Usuario;
  public auth2: any;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    // Iniciliza la Configuracion del Login de Google
    this.initGoogle();
  }

  /////////////////////////////////
  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }

  /////////////////////////////////
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /////////////////////////////////
  validarToken(): Observable<boolean> {

    return this.http.get(`${base_URL}/login/verificarToken`, {
      headers: {
        'x-token': this.getToken()
      }
    }).pipe(
      map((resp: any) => {
        // Actualizo el token en el localStore
        localStorage.setItem('token', resp.token);

        // Guardo la Informacion del Usuaio Logueado
        const { role, google, nombre, email, img, id } = resp.usuario;
        this.usuarioLogeado = new Usuario(id, nombre, '', email, google, role, img);

        console.log(this.usuarioLogeado);
        return true;
      }),
      // Captura del Error 
      catchError(error => of(false))
    )
  }

  ///////////////////////////////////
  crearUsuario(formRegistro: RegistroFromulario) {
    return this.http.post(`${base_URL}/usuarios`, formRegistro)
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token))
      );
  }

  ///////////////////////////////////
  actualizarPerfil(formPerfil: { nombre: string, email: string, role: string }) {

    formPerfil = {
      ...formPerfil,
      role: this.usuarioLogeado.role
    }
    return this.http.put(`${base_URL}/usuarios/${this.usuarioLogeado.id}`, formPerfil, {
      headers: { 'x-token': this.getToken() }
    });
  }

  //////////////////////////////////
  loginUsuario(formLogin: LoginFormulario) {
    if (formLogin.recuerdame)
      localStorage.setItem('email', formLogin.email);
    else
      localStorage.removeItem('email');

    return this.http.post(`${base_URL}/login`, formLogin)
      .pipe(map((resp: any) => {
        localStorage.setItem('id', resp.usuario.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        return true;
      }));
  }


  //////////////////////////////////
  initGoogle() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '471108858446-p7a69slr6ocjqdqsdusdu9u1v7psnqt6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve(true);
      });

    });
  }
  //////////////////////////////////
  loginGoogle(token: string) {

    return this.http.post(`${base_URL}/login/google`, { 'tokenGoogle': token })
      .pipe(map((resp: any) => {
        localStorage.setItem('token', resp.token);
        return true;
      }));

  }
}