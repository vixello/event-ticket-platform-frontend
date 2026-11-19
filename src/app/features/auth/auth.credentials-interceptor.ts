import { HttpInterceptorFn } from "@angular/common/http";

function getXsrfTokenFromCookie(): string | null{
    if(typeof document === undefined){
        return null;
    }

    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith('XSRF_TOKEN='));
        
    return  match ? decodeURIComponent(match.split('=')[1]) : null; 
}

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
    const isMutating = !['GET', 'OPTIONS', 'HEAD'].includes(req.method.toUpperCase());

    const xsrfToken = isMutating? getXsrfTokenFromCookie : null;

    const headers = xsrfToken && !req.headers.has('XSRF_TOKEN=') 
                    ? req.headers.set('X_XSRF_TOKEN', xsrfToken.toString())
                    : req.headers;

    return next(
        req.clone({
            withCredentials: true,
            headers: headers
        })
    )
};