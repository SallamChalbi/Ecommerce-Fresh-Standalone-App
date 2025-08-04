import { HttpInterceptorFn } from '@angular/common/http';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('token')){
    const Token: any = {
            token: localStorage.getItem('token')
         };

    req = req.clone({
      setHeaders: Token
    })
  }
  return next(req);
};
