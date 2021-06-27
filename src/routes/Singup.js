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
import {addUser} from "../services/login"

import {
  useHistory 
 } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '50ch',
    },
  },
}));
const Signup = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    username: { error: "", value: "" },
    password: { error: "", value: "" }
  });
  const [email, setEmail] = React.useState('');
  const [fname, setfname] = React.useState('');
  const [lname, setlname] = React.useState('');
  const [username, setusername] = React.useState('');
  const [pass, setpass] = React.useState('');

  let history = useHistory();
  function hasFormValueChanged(model) {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
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

  const handleSubmit = () => {
    if(fname && email && lname && username && pass) {
      console.log("vvbvbvbv found")
      let body ={
        'fName':fname,
        'email':email,
        'lname':lname,
        'username':username,
        'password':pass
      }
      console.log(body,"boy")
      addUser(body)
      .then((response) => {
        console.log("Response")
         if(response && response.error){
             console.log('slllll*********************')
             toast.error(response.error.message, {
              position: toast.POSITION.BOTTOM_CENTER
            });
         }
         else{
          // history.push("/")
           toast.success('Customer created successfully!', {
              position: toast.POSITION.BOTTOM_CENTER
            });
            history.push("/")
         }
      })
    }
    else {
      console.log("fields no")

      toast.error('Please fill all the fields', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    
};


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
                 <form onSubmit={handleSubmit}>
                 <div class="form-group">
                 <TextField id="input_email"
                 variant="outlined"
                  field="email"
                  value={email}
                  onChange = {(e,email) => setEmail(e.target.value)}
                  maxLength={100}
                  className={classes.textField}
                  size="small"
                  required={true}
                  fullWidth
                  placeholder="Email" />
                  </div>
                 <div class="form-group">
                 <TextField id="input_fname"
                  field="fname"
                  value={fname}
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange = {(e,fname) => setfname(e.target.value)}
                  required={true}
                  maxLength={100}
                  placeholder="First Name" />
                  </div>
                  <div class="form-group">
                 <TextField id="input_lname"
                  field="lname"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={lname}
                  onChange = {(e,lname) => setlname(e.target.value)}
                  required={true}
                  maxLength={100}
                  placeholder="Last Name" />
                  </div>
                  <div class="form-group">
                 <TextField id="input_username"
                  field="username"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={username}
                  onChange = {(e,username) => setusername(e.target.value)}
                  required={true}
                  maxLength={100}
                  placeholder="User Name" />
                  </div>
                  <div class="form-group">
                 <TextField id="input_pass"
                  field="pass"
                  value={pass}
                  fullWidth
                  size="small"
                  onChange = {(e,pass) => setpass(e.target.value)}
                  required={true}
                  variant="outlined"
                  type="password"
                  maxLength={100}
                  placeholder="Password" />
                  </div>
                 
                  <button
                   name="login" id="login"
                    className={`btn btn-block login-btn mb-4`}
                    type="submit">
                    Sign Up
                  </button>
                </form>
                <p class="login-card-footer-text">Do you have an account? <a href='javascript:void(0)' onClick={()=>history.push('/')} href="#!" class="text-reset">Login here</a></p>
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
