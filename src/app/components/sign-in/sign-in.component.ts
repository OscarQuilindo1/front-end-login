import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  contrasena: string = '';
  fecha_nacimiento: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userServices: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addUser() {
    //Validacion de campos
    if (
      this.nombre == '' ||
      this.email == '' ||
      this.contrasena == '' ||
      this.fecha_nacimiento == ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', '');
      return;
    }

    //Crear el Objeto
    const user: User = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
      fecha_nacimiento: this.fecha_nacimiento,
    };

    this.loading = true;
    this._userServices.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('Registro con exito');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.msgError(e);
      },
      complete: () => {},
    });
  }

  msgError(e: HttpErrorResponse){

    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Ocurrio un error con el servidor', 'Error');
    }

  }
}
