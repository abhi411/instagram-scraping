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
export default function FormDialog(props) {
  const { onClose, selectedValue, open , loadTopic } = props;
  var file = ""
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = () => {
  
}

function reverseString(str) {
  let splitString = str.split(""); // var splitString = "hello".split("");
  let reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  let joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  return joinArray; // "olleh"
  }
  
  function getFile(ev) {
  if(ev && ev.target && ev.target.files) {
   file = ev.target.files[0] ? ev.target.files[0] : null
  if (file) {
    console.log(reverseString(reverseString(file.name).split(".")[0]).toLowerCase())
  if (reverseString(reverseString(file.name).split(".")[0]).toLowerCase() == 'json') {
    // fileUpload()
  //PASS UPLOAD FUNCTION HERE
  }
  else {
    file =null
    alert('Please select JSON files only!')
  }
  }
  }
  }
  



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Topics</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose the Json file from your system directory to upload the topics.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="topic"
            label="Topic File"
            type="file"
            onChange={getFile}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="Secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="Secondary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}