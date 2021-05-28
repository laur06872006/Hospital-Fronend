import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';
import { delay } from 'rxjs/operators';

//Servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy {

    public escuchandoSubioImagen: Subscription
    public totalRegistros: number = 0;
    public listaUsuarios: Usuario[] = [];
    public listatemp: Usuario[] = [];
    public paginaActual: number = 1;
    public totalPagina: number = 1;
    public cargandoData: boolean = true;
    public buscando: boolean = false;
    private mostrarDesde = 0;


    constructor(public usuarioService: UsuarioService,
        private busquedasService: BusquedasService,
        private modalImagenService: ModalImagenService
    ) { }


    ngOnDestroy(): void {
        // Eliminando la subcripcion 
        this.escuchandoSubioImagen.unsubscribe();
    }

    ngOnInit(): void {
        // Muestra los Usuarios en la Tabla
        this.mostrarUsuarios();

        // Subcribiendo al cambio de imagen de los Usuarios
        this.escuchandoSubioImagen = this.modalImagenService.subioImagenEmiter
            .pipe(delay(100))
            .subscribe(img => {
                this.mostrarUsuarios();
            })
    }

    ////////////////////////////
    abrirModalImagen(usuario: Usuario) {
        this.modalImagenService.abrirModal('usuarios', usuario.id, usuario.img);
    }

    ////////////////////////////
    mostrarUsuarios() {
        this.cargandoData = true;
        // Llamada a la API 
        this.usuarioService.cargarUsuarios(this.mostrarDesde)
            .subscribe(({ totalRegistros, usuarios }) => {
                this.totalRegistros = totalRegistros;
                this.listaUsuarios = usuarios;
                this.listatemp = usuarios;
                // Calcula el Numero de Paginas
                let pag = totalRegistros / 5;
                if (!Number.isInteger(pag))
                    pag = parseInt(pag.toString(), 10) + 1;

                this.totalPagina = pag
                this.cargandoData = false;
            });

    }

    ////////////////////////////
    paginaSiguiente() {
        if (this.paginaActual != this.totalPagina) {
            this.mostrarDesde += 5;
            this.paginaActual++;
            this.mostrarUsuarios();
        }
    }

    ////////////////////////////
    paginaAnterior() {
        if (this.paginaActual != 1) {
            this.mostrarDesde -= 5;
            this.paginaActual--;
            this.mostrarUsuarios();
        }
    }

    ////////////////////////////
    buscar(event, cadenaBuscar: string = '') {

        // Cadena Vacia
        if (cadenaBuscar.length === 0) {
            this.buscando = false;
            return this.listaUsuarios = this.listatemp;
        }

        this.buscando = true;
        // Tecla no es la tecla ENTER
        if (!(event.keyCode == 13))
            return;

        this.cargandoData = true;
        this.busquedasService.buscarPorColeccion('usuarios', cadenaBuscar)
            .subscribe(({ totalRegistros, usuarios }) => {
                this.totalRegistros = totalRegistros
                this.listaUsuarios = usuarios;
                this.cargandoData = false;
            });
    }

    ///////////////////////////
    cambiarRole(usu: Usuario) {
        this.usuarioService.actualizarRole(usu)
            .subscribe(resp => console.log(resp))
    }

    ///////////////////////////
    borrar(usu: Usuario) {

        Swal.fire({
            title: '¿ Eliminar ?',
            text: `${usu.nombre} - ${usu.email} `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR'
        }).then((result) => {

            if (result.isConfirmed) {

                this.usuarioService.eliminarUsuario(usu.id)
                    .subscribe(resp => {
                        this.mostrarDesde = 0;
                        this.paginaActual = 1;
                        this.mostrarUsuarios();
                        Swal.fire('Eliminado!', `Se elimino Correctamente a ${usu.nombre}`, 'success');
                    })
            }
        })
    }

}

