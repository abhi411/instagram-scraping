import React, { Fragment ,useEffect} from "react";
import { Switch, Route } from "react-router";
import Request from "./Request";
import SideNav from "./SideNav";
import { useHistory } from "react-router-dom";

const Admin = () => {
	let history = useHistory();

console.log("hello ")
useEffect(() => { // Update the document title using the browser API document.title = `You clicked ${count} times`; 
  let token = localStorage.getItem('token')
  if (!token)
    history.push("/");
},[]);


  return (
    <Fragment>
      <div>
      <SideNav/>
      </div>
    </Fragment>
  );
};

export default Admin;
