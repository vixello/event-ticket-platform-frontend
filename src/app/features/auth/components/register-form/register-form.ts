import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register-form',
  templateUrl: './register-form.html',
})
export class RegisterForm {

  email = '';
  password = '';
  confirmPassword = '';

  onSubmit(): void {
    if (
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      return;
    }

    // Registration will be connected to Keycloak/AuthService later.
  }
}
