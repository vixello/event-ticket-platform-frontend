import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:9090',
  realm: 'event-ticket-platform',
  clientId: 'event-ticket-platform-app',
};