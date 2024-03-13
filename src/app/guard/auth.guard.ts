import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(ApiService)
  const router = inject(Router)


  if (authStatus.isLoggedin()) {
    return true;
  }else{
    alert("Authentication failed!!!!")
    router.navigateByUrl("/")
    return false;
  }
};
