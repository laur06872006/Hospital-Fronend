
import { environment } from "../../environments/environment.prod";

const urlAPI = environment.base_URL;

export class Usuario {

    constructor(
        public id: string,
        public nombre: string,
        public pasword?: string,
        public email?: string,
        public google?: boolean,
        public role?: string,
        public img?: string) { }

    get getImagen() {

        // Si existe la Imagen
        if (this.img) {
            // SI la imagen es de Google
            if (this.img.includes('https'))
                return this.img;
            else
                // Si es una Imagen cargada
                return `${urlAPI}/uploads/usuarios/${this.img}`;
        } else
            return `${urlAPI}/uploads/usuarios/no-img.jpg`;
    }


}