import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  imports: [RegisterForm],
  selector: 'app-register',
  templateUrl: './register.html',
})
export class Register {}
