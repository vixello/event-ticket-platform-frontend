import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { keycloakConfig } from './auth.config';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/LocalStorageService';
import { filter, firstValueFrom, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router) { }

    private readonly keycloak = new Keycloak(keycloakConfig);
    private readonly authenticated = signal(false);
    private readonly initialized = signal(false); // Track init state
    private platformId = inject(PLATFORM_ID);
    localStorage = inject(LocalStorageService);

    readonly isAuthenticated = this.authenticated.asReadonly();
    readonly isInitialized = this.initialized.asReadonly();

    async init(): Promise<boolean> {
        if (!isPlatformBrowser(this.platformId)) {
            this.initialized.set(true);
            return false;
        }

        try {
            const authenticated = await this.keycloak.init({
                onLoad: 'check-sso',
                pkceMethod: 'S256',
                redirectUri: window.location.href,
                checkLoginIframe: false,
            });

            this.authenticated.set(authenticated);
            
            const urlParams = new URLSearchParams(window.location.search);
            if (authenticated && (urlParams.has('code') || urlParams.has('state'))) {
                this.onLoginSuccess();
            }
        } catch (error) {
            console.error('Keycloak init failed', error);
        } finally {
            this.initialized.set(true); // Mark initialization as complete no matter what
        }

        return this.authenticated();
    }

    // Helper to let guards wait until Keycloak finishes initializing
    async waitUntilInitialized(): Promise<void> {
        if (!isPlatformBrowser(this.platformId)) return;
        while (!this.initialized()) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
    }

    get token(): string | undefined { return this.keycloak.token; }
    get roles(): string[] { return this.keycloak.realmAccess?.roles ?? []; }
    hasRole(role: string): boolean { return this.keycloak.hasRealmRole(role); }

    async login(): Promise<void> { await this.keycloak.login({ redirectUri: window.location.href }); }
    async logout(): Promise<void> { await this.keycloak.logout({ redirectUri: window.location.origin }); }
    async register(): Promise<void> { await this.keycloak.register({ redirectUri: window.location.origin, }); }

    onLoginSuccess(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl') || '/';
        const pendingCart = this.localStorage.getItem('pending_cart');

        if (pendingCart) {
            const cartData = JSON.parse(pendingCart);
            this.localStorage.removeItem('pending_cart');
            this.router.navigate(['/checkout'], { state: { cartData }, replaceUrl: true });
        } else if (returnUrl) {
            this.router.navigateByUrl(returnUrl, { replaceUrl: true });
        }
    }

    async updateToken(): Promise<boolean> {
        try {
            return await this.keycloak.updateToken(30);
        } catch (error) {
            console.error('Failed to refresh Keycloak token', error);
            return false;
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
}