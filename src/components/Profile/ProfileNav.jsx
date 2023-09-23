import classes from "./Profile.module.css";
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/my-friends"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            My Friends
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/wishlist"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            My Wishlist
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default ProfileNav;
