import { Component } from '@angular/core';
import Swal from 'sweetalert2';

//Servicios
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SubirImagenService } from 'src/app/services/subir-Imagen.service';

@Component({
    selector: 'app-Modal-Imagen',
    templateUrl: './modal-imagen.component.html'
})
export class ModalImagenComponent {

    public imagenSubir: File;
    public imagenTemp: any = null;

    constructor(
        public modalImagenService: ModalImagenService,
        public subirImagenService: SubirImagenService
    ) { }

    cerrarModal() {
        this.imagenTemp = null;
        this.modalImagenService.cerrarModal();
    }

    cambiarImagen(imagen: File) {
        this.imagenSubir = imagen;

        if (!imagen) {
            return this.imagenTemp = null;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imagen);

        reader.onloadend = () => {
            this.imagenTemp = reader.result;
        }
    }

    subirImagen() {

        const tipo = this.modalImagenService.tipo;
        const id = this.modalImagenService.id;


        console.log(tipo);
        console.log(id);

        this.subirImagenService
            .actualizarFoto(this.imagenSubir, tipo, id)
            .then(img => {
                this.cerrarModal();
                // Emitir para actualizar a la tabla usuarios
                this.modalImagenService.subioImagenEmiter.emit(img);
                Swal.fire('Guardo', 'Imagen Actualizada', 'success')
            })
            .catch(err => {
                this.cerrarModal();
                Swal.fire('ATENCION', 'No se pudo subir la Imagen', 'error');
            })
    }


}
