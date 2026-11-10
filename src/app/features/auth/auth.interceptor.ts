import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { from, switchMap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.token;

    return from(authService.updateToken()).pipe(
        switchMap(() => {
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            return next(req);
        })
    )
};