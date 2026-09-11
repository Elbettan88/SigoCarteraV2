import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutService } from '../services/aut';

export const authGuard: CanActivateFn = (route, state) => {
  const autService = inject(AutService);
  const router = inject(Router);

  if (!autService.estaAutenticado()) {
    router.navigate(['/login']);
    return false;
  }

  const rolesPermitidos = route.data['roles'] as Array<string>;
  if (rolesPermitidos) {
    const rol = autService.obtenerRolUsuario();
    if (!rolesPermitidos.includes(rol)) {
      router.navigate(['/dashboard']);
      return false;
    }
  }

  return true;
};
