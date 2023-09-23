import { Fragment } from "react";
import ProfileNav from "../components/Profile/ProfileNav";
import { Outlet } from "react-router-dom";

export default function ProfileRoot() {
  return (
    <Fragment>
      <ProfileNav></ProfileNav>
      <Outlet></Outlet>
    </Fragment>
  );
}
