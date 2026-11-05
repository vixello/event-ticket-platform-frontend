import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const uuidGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const id =
    route.paramMap.get('id') ??
    route.paramMap.get('eventId');

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return id && uuidRegex.test(id)
    ? true
    : router.createUrlTree(['/not-found']);
};