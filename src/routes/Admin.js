import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import Request from "./Request";
import SideNav from "./SideNav";
const Admin = () => {
console.log("hello ")
  return (
    <Fragment>
      <div>
      <SideNav/>
      </div>
    </Fragment>
  );
};

export default Admin;
