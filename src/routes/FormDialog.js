import React, {useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OpenInBrowserOutlined } from '@material-ui/icons';
import {toast} from 'react-toastify';
import {createRequest} from '../services/request';
export default function FormDialog(props) {
  const { onClose, selectedValue, open , loadTopic } = props;
  var username = ""
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = () => {
    if(!username) {
      alert('Please enter the username!')
    }
    else {
      let req = {
        "username": username,
        "userId":localStorage.getItem('userId')
      }
      createRequest(req)
       .then((response) => {
        if(response && response.error && response.error.message == 'Authorization Required'){
            console.log('slllll*********************')
        }
       else {
            onClose(selectedValue);
            loadTopic();
        }
      })
    }
  }


  function getUsername(ev) {
    console.log("ev",ev.target.value)
    if(ev && ev.target && ev.target.value) {
      username = ev.target.value
    }
  }
  



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Get Followers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the instragram username to get the top 10 followers.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="topic"
            label="Username"
            type="input"
            onChange={getUsername}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="Secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="Secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}