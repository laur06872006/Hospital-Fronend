import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

//Enviroments
import { environment } from '../../environments/environment';
// Interfaces
import { RegistroFromulario } from '../interfaces/registro-form.interface';
import { LoginFormulario } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
//Modelos
import { Usuario } from '../models/usuario.model';


const base_URL = environment.base_URL;
// Variable para Manejar el login de Google
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
  getHeaders() {
    return {
      headers: {
        'x-token': this.getToken()
      }
    }
  }

  /////////////////////////////////
  validarToken(): Observable<boolean> {

    const URL = `${base_URL}/login/verificarToken`;
    return this.http.get(URL, this.getHeaders()).pipe(
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

    const URL = `${base_URL}/usuarios`;
    return this.http.post(URL, formRegistro)
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token))
      );
  }

  ///////////////////////////////////
  actualizarPerfil(formPerfil: { nombre: string, email: string, role: string }) {

    // Agregando el ROlE
    formPerfil = {
      ...formPerfil,
      role: this.usuarioLogeado.role
    }

    const URL = `${base_URL}/usuarios/${this.usuarioLogeado.id}`;
    return this.http.put(URL, formPerfil, this.getHeaders());
  }

  ///////////////////////////////////
  actualizarRole(usuario: Usuario) {

    const URL = `${base_URL}/usuarios/${usuario.id}`;
    return this.http.put(URL, usuario, this.getHeaders());
  }

  //////////////////////////////////
  loginUsuario(formLogin: LoginFormulario) {
    if (formLogin.recuerdame)
      localStorage.setItem('email', formLogin.email);
    else
      localStorage.removeItem('email');

    const URL = `${base_URL}/login`;
    return this.http.post(URL, formLogin)
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

    const URL = `${base_URL}/login/google`;
    return this.http.post(URL, { 'tokenGoogle': token })
      .pipe(map((resp: any) => {
        localStorage.setItem('token', resp.token);
        return true;
      }));

  }

  //////////////////////////////////
  cargarUsuarios(desde: number = 0) {

    const URL = `${base_URL}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(URL, this.getHeaders()).pipe(
      map(resp => {
        // transformo cada posicion en una instancia del modelo Usuario
        const usuarios = resp.usuarios.map(user =>
          new Usuario(user.id, user.nombre, '', user.email, user.google, user.role, user.img)
        );

        return {
          totalRegistros: resp.totalRegistros,
          usuarios
        }

      })
    );
  }


  ////////////////////////////////
  eliminarUsuario(idUsu: String) {

    //http://localhost:3000/api/usuarios/609eb00b3883a41cd83615d8
    const URL = `${base_URL}/usuarios/${idUsu}`;
    return this.http.delete(URL, this.getHeaders())

  }


}