import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

import { keycloakConfig } from './auth.config';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

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
            pkceMethod: 'S256',
            redirectUri: window.location.origin,
        });

        this.authenticated.set(authenticated);
        return authenticated;
    }

    get token(): string | undefined {
        return this.keycloak.token;
    }

    async login(): Promise<void> {
        await this.keycloak.login({
            redirectUri: window.location.origin,
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

    get username(): string | undefined {
        return this.keycloak.tokenParsed?.['preferred_username'];
    }

    get email(): string | undefined {
        return this.keycloak.tokenParsed?.['email'];
    }
}