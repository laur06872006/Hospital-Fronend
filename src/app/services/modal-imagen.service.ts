import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const baseURL = environment.base_URL;

@Injectable({
    providedIn: 'root'
})
export class ModalImagenService {

    private _cerrarModal: boolean = true;
    public tipo: 'usuarios' | 'medicos' | 'hospitales';
    public id: string;
    public img: string;

    public subioImagenEmiter: EventEmitter<string> = new EventEmitter<string>();

    estaCerrado(): boolean {
        return this._cerrarModal;
    }

    abrirModal(
        tipo: 'usuarios' | 'medicos' | 'hospitales',
        id: string,
        img: string = 'no_img'
    ) {

        this.tipo = tipo;
        this.id = id;
        this.img = img;

        if (img.includes('http')) {
            this.img = img;
        } else {
            this.img = `${baseURL}/uploads/${tipo}/${img}`;
        }
        console.log(this.img);
        this._cerrarModal = false;
    }

    cerrarModal() {
        this._cerrarModal = true;
    }

}