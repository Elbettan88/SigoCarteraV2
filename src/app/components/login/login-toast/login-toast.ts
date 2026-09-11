import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-toast.html',
  styleUrls: ['./login-toast.scss'],
})
export class LoginToast {
  // Micro-componente atómico y aislado para el aviso de bienvenida corporativo
}
