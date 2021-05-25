import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { RegistroFromulario } from '../interfaces/registro-form.interface';
import { LoginFormulario } from '../interfaces/login-form.interface';

const base_URL = environment.base_URL;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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
  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_URL}/login/verificarToken`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      // Actualizo el token en el localStore
      tap((resp: any) => localStorage.setItem('token', resp.token)),
      // Retorno true
      map(resp => true),
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