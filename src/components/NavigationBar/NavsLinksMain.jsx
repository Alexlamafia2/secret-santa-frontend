import classes from "./NavLinksMain.module.css";
import keycloak from "../../util/keycloak";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavLinksMain = () => {
  const logoutHandler = () => {
    keycloak.logout({ redirectUri: "http://localhost:5173/" });
  };

  return (
    <div className={classes.auth}>
      <ul className={classes["nav-links"]}>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          <Link to="/profile">Account</Link>
        </li>
        <li onClick={logoutHandler}>Logout</li>
        <li>
          <FontAwesomeIcon icon={faBell} className={classes["bell-icon"]} />
        </li>
      </ul>
    </div>
  );
};
export default NavLinksMain;
