import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login-form',
  templateUrl: './login-form.html',
})
export class LoginForm {
  email = ''
  password = ''

  onSubmit(): void {
    console.log('Login attempt:', this.email);
  }
}
