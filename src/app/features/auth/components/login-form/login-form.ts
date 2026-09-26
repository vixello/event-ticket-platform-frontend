import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login-form',
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly authService = inject(AuthService);

  async onSubmit(): Promise<void> {
    await this.authService.login();
  }
}
