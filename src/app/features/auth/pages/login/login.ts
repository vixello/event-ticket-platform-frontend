import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  imports: [LoginForm],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {}
