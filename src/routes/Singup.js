import React, { useState, FormEvent, Dispatch } from "react";
import {toast} from 'react-toastify';
import TextInput from "../common/components/TextInput";
import { Link } from "react-router-dom"; 
import login from "../assets/images/login.jpg";
import logo from "../assets/images/logo.svg";
import "../styles/login.css";
import "../styles/login.css.map";
import "../styles/login.scss";
import { ChangeHistory } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory 
 } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));
const Signup = () => {
  const [formState, setFormState] = useState({
    username: { error: "", value: "" },
    password: { error: "", value: "" }
  });
  const [islogin, setLogin] = React.useState(true);
  let history = useHistory();
  function hasFormValueChanged(model) {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e) {
    history.push("/user")

    console.log("onsbmit called",formState.username.value,formState.password.value)
    e.preventDefault();
    if(isFormInvalid()) { return; }
    else {
      if(formState.username.value == 'admin' && formState.password.value == 'pas'){
        console.log("correct")
     
      }
      else{
        toast.error('Usern  ame or password incorrect', 
        {position: toast.POSITION.BOTTOM_CENTER})
      }
    }
  }

  function route() { 
    console.log("route claase")
  
    }
  function isFormInvalid() {
    return (formState.username.error || formState.password.error
      || !formState.username.value || !formState.password.value);
  }

  function getDisabledClass() {
    let isError = isFormInvalid();
    return isError ? "disabled" : "";
  }

  return (
    <div  class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">

        <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
          <img src={login} class="login-card-img" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
              <img src={logo} class="logo" />
              </div>
              <p class="login-card-description">Signup your account</p>
                 <form onSubmit={submit}>
                 <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input type="email" name="email" id="email" class="form-control" placeholder="Email address"></input>
                  </div>
                  <div class="form-group">
                    <label for="email" class="sr-only">First Name</label>
                    <input type="text" name="fname" id="fname" class="form-control" placeholder="First Name"></input>
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="sr-only">Last Name</label>
                    <input type="text" name="lastName" id="lastName" class="form-control" placeholder="Last Name"></input>
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="sr-only">User Name</label>
                    <input type="text" name="username" id="username" class="form-control" placeholder="User Name"></input>
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" id="password" class="form-control" placeholder="***********"></input>
                  </div>
                  <button
                   name="login" id="login"
                    className={`btn btn-block login-btn mb-4`}
                    type="submit">
                    Sign Up
                  </button>
                </form>
                <p class="login-card-footer-text">Do you have an account? <a href='javascript:void(0)' onClick={()=> setLogin(false)} href="#!" class="text-reset">Login here</a></p>
                <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
            </div>
          </div>
        </div>
      </div>
       
    </div>
    </div>
  );
};

export default Signup;
