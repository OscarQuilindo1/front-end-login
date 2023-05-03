import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/interfaces/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nombre: string = '';
  especie: string = '';
  raza: string = '';
  fecha_nacimiento = '';
  foto: string = '';
  imgUrl = '../../../assets/images/pets.png';

  listPets: Pet[] = [];

  constructor(
    private _petService: PetService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this._petService.getPets().subscribe((data) => {
      this.listPets = data;
    });
  }

  

  upLoad() {
    //Crear el Objeto
    const pet: Pet = {
      nombre: this.nombre,
      especie: this.especie,
      raza: this.raza,
      fecha_nacimiento: this.fecha_nacimiento,
      foto: this.foto,
    };

    this._petService.postPets(pet).subscribe({
      next: (v) => {
        this.toastr.success('Registro con exito');
        this.router.navigate(['/dashboard/']);
      },
      error: (e: HttpErrorResponse) => {
        this.msgError(e);
        console.log(e);
      },
      complete: () => {},
    });
  }

  msgError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Ocurrio un error con el servidor', 'Error');
    }
  }
}
