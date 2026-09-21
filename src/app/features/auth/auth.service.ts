import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

import { keycloakConfig } from './auth.config';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly keycloak = new Keycloak(keycloakConfig);

    async init(): Promise<boolean> {
        return this.keycloak.init({
            onLoad: 'check-sso',
            pkceMethod: 'S256',
            redirectUri: window.location.origin,
        });
    }

    get isAuthenticated(): boolean {
        return !!this.keycloak.authenticated;
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