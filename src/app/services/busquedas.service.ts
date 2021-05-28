import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
//Interfaces
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
// Modelos
import { Usuario } from '../models/usuario.model';

const base_URL = environment.base_URL;

@Injectable({
    providedIn: 'root'
})
export class BusquedasService {

    constructor(private http: HttpClient) { }

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

    //////////////////////////////////
    tranfromarUsuario(areglo: any[]): CargarUsuario {
        // transformo cada posicion en una instancia del modelo Usuario
        const usuarios = areglo.map(user =>
            new Usuario(user.id, user.nombre, '', user.email, user.google, user.role, user.img)
        );

        return {
            totalRegistros: usuarios.length,
            usuarios
        }
    }

    //////////////////////////////////
    buscarPorColeccion(
        tipoColl: 'usuarios' | 'medicos' | 'hospitales',
        cadena: string = ''
    ) {

        //Llamado a la API
        const URL = `${base_URL}/busqueda/coleccion/${tipoColl}/${cadena}`;
        return this.http.get<CargarUsuario>(URL, this.getHeaders())
            .pipe(map((resp: any) => {

                switch (tipoColl) {
                    case 'usuarios':
                        return this.tranfromarUsuario(resp.data);
                        break;
                }
            }));

    }
}