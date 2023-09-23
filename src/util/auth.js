import { redirect } from "react-router-dom";
import keycloak from "./keycloak";

export function checkAuthLoader() {
  if (!keycloak.authenticated) {
    return redirect("/");
  }
  return null;
}

export function getAuthToken() {
  const token = localStorage.getItem("1");
  if (!token) {
    return null;
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  localStorage.setItem(token, 1);

  return token;
}
