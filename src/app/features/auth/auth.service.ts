import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

import { keycloakConfig } from './auth.config';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private router: Router, private route: ActivatedRoute) { }

    private readonly keycloak = new Keycloak(keycloakConfig);
    private readonly authenticated = signal(false);
    private platformId = inject(PLATFORM_ID);

    readonly isAuthenticated = this.authenticated.asReadonly();

    async init(): Promise<boolean> {

        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }

        const authenticated = await this.keycloak.init({
            onLoad: 'check-sso',
            // onLoad: 'login-required',
            pkceMethod: 'S256',
            redirectUri: window.location.href,
            checkLoginIframe: false
        });

        this.authenticated.set(authenticated);
        console.log('Keycloak initialized');
        console.log('Authenticated:', authenticated);
        console.log('Username:', this.username);
        console.log('Roles:', this.roles);

        if (authenticated) {
            this.onLoginSuccess();
        }
        return authenticated;
    }

    get token(): string | undefined {
        return this.keycloak.token;
    }

    async login(): Promise<void> {
        await this.keycloak.login({
            redirectUri: window.location.href,
        });
    }

    async register(): Promise<void> {
        await this.keycloak.register({
            redirectUri: window.location.origin,
        });
    }

    async logout(): Promise<void> {
        await this.keycloak.logout({
            redirectUri: window.location.origin,
        });
    }

    async updateToken(): Promise<boolean> {
        try {
            return await this.keycloak.updateToken(30);
        } catch (error) {
            console.error('Failed to refresh Keycloak token', error);
            return false;
        }
    }

    onLoginSuccess(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get(`returnUrl`) || `/`;

        const pendingCart = localStorage.getItem(`pending_cart`);

        if (pendingCart) {
            const cartData = JSON.parse(pendingCart);
            localStorage.removeItem('pending_cart');
            
            this.router.navigate([`/checkout`], {
                state: { cartData },
                replaceUrl: true
            });
        } else {
            this.router.navigateByUrl(returnUrl, { replaceUrl: true });
        }
    }

    get username(): string | undefined {
        return this.keycloak.tokenParsed?.['preferred_username'];
    }

    get email(): string | undefined {
        return this.keycloak.tokenParsed?.['email'];
    }

    get userId(): string | undefined {
        return this.keycloak.subject;
    }

    get roles(): string[] {
        return this.keycloak.realmAccess?.roles ?? [];
    }

    hasRole(role: string): boolean {
        return this.keycloak.hasRealmRole(role);
    }
}