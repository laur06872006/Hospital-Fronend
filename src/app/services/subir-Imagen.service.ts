import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const baseURL = environment.base_URL;

@Injectable({
    providedIn: 'root'
})
export class SubirImagenService {
    constructor() {
    }

    async actualizarFoto(
        archivo: File,
        tipo: 'usuarios' | 'medicos' | 'hospitales',
        id: string
    ) {

        try {

            const url = `${baseURL}/uploads/${tipo}/${id}`;
            // Body de la Peticion
            const data = new FormData();
            data.append('imagen', archivo);

            // la Peticion HTTP con fetch
            const resp = await fetch(url, {
                method: 'PUT',
                headers: {
                    'x-token': localStorage.getItem('token') || ''
                },
                body: data
            });

            const respData = await resp.json();
            if (respData.ok) {
                return respData.nombreArchivo;
            } else {
                console.log(respData);
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}