import logo from './logo.svg';
import "./styles/sb-admin-2.min.css";
import Login from '../src/routes/Login'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';
import Signup from '../src/routes/Singup'
import Admin from '../src/routes/Admin'
const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main:"#000",
    },
    primary:{
      main:"#FF5733"
    }
  },
});

const innerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
});

toast.configure()

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={outerTheme}> 
        <Router>
          <Switch>
          <Route path="/signup">
           <Signup/>
          </Route>
          <Route path="/user">
            <Admin/>
          </Route>
          <Route path="/">
           <Login/>
          </Route>
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
