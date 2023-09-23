import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "http://localhost:8181/",
  realm: "SecretSantaDev",
  clientId: "React-auth",
});

export default keycloak;
