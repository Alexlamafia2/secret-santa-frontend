import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import keycloak from "./util/keycloak";
// import { Provider } from "react-redux";
// import store from "./store";

keycloak
  .init({ onLoad: "check-sso", pkceMethod: "S256" })
  .then(() => {
    console.log(keycloak);
    localStorage.setItem("1", keycloak.token);
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  })
  .catch((error) => {
    console.error("Keycloak initialization error:", error);
  });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
