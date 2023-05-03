import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/interfaces/userLogin';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  contrasena: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    //Validacion Ingreso de datos
    if (this.email == '' || this.contrasena == '') {
      this.toastr.error('Todos los campos son obligatorios', '');
      return;
    }

    //Crear el Objeto
    const userLogin: UserLogin = {
      email: this.email,
      contrasena: this.contrasena,
    };

    this.loading = true;
    this._userService.login(userLogin).subscribe({
      next: (v) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', v);
        console.log(v);
      },
      error: (e: HttpErrorResponse) => {
        this.msgError(e);
        this.loading = false;
      },
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
