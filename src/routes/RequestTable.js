import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/Publish';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SearchBar from "material-ui-search-bar";
import {  BrowserRouter as Router, Route, Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormDialog from "./FormDialog";
import React, {useEffect } from 'react';
import {toast} from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import {
  useHistory 
 } from "react-router-dom";
var rows= []

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));




export default function RequestTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searched, setSearched] = React.useState("");
  const [fromDate, setfromDate] = React.useState(new Date());
  const [toDate, settoDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
  let history = useHistory();
  const [rowData, setRows] = React.useState([]);
  let role =  localStorage.getItem('role');
  let user =  localStorage.getItem('customerId');
  function createData(name, calories,datetime, fat, carbs,status, btn) {
    return { name, calories,datetime, fat, carbs,status, btn };
  }
  
  const rows = [
    createData('1', 'John Doe', '12-Mar-2021 14:52','12-Mar-2021 14:52', '700','Pending', uploadIcon()),
    createData('2', 'Arip', '11-Feb-2021 11:01','12-Mar-2021 14:52','600', 'Pending' ,uploadIcon()),
    createData('3', '@Mx', '21-Jan-2021 01:58','12-Mar-2021 14:52', '4000','Pending',  uploadIcon()),
    createData('4', 'Db', '27-Mar-2021 17:24','12-Mar-2021 14:52',  '3677','Pending',uploadIcon()),
    createData('5', 'Eric', '25-Dec-2020 23:40','12-Mar-2021 14:52', '899','Pending', uploadIcon()),
   ];
  function uploadIcon(){
    return <Button variant="contained" color="primary">
    View Details
  </Button>
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  let headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'SNo' },
    { id: 'datetime', numeric: false, disablePadding: false, label: 'Requested Date' },
    { id: 'calories', numeric: false, disablePadding: false, label: 'Userprofile Name' },
    { id: 'fat', numeric: false, disablePadding: false, label: 'folllowers' },
    { id: 'carbs', numeric: false, disablePadding: false, label: 'Resolved Date' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'btn', numeric: false, disablePadding: false, label: 'View Details' }
  ];

  
  
   function RequestTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            role != 'admin' && headCell.id === 'Delete' ? 
            null
            : 
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  RequestTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const RequestTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const [dailog, setdailog] = React.useState(false);
    
  
    const handleClose = () => {
      setdailog(false)
    }
  
    const handledailog = (value) => {
      setdailog(value)
    }
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {
            role == 'admin' ?
            <Button
              variant="contained"
              color="secondary"
              onClick={ () => handledailog(true) }
              className={classes.button}
              endIcon={<Icon></Icon>}
            >
              UPLOAD TOPIC
            </Button>
            :
            null
          }
            
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        {
          dailog?
          <FormDialog open={true} onClose={handleClose} />
          :
          null
        }
      </Toolbar>
    );
  };
  
  RequestTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
 
 
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log("select event ocue",event)
   
  };

  const requestSearch = (searchedVal) => {  
    const filteredRows = headCells.filter((row) => {
      return row.id.toLowerCase().includes(searchedVal.toLowerCase());
    });
    // setRowsPerPage(filteredRows);
  };
  
  const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
  };

  const handleClick = (event, name) => {
   console.log("event selcted",name)

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

 
  function displayDate(date) {
    console.log("djfdkjfk", new Date(date).getFullYear()+'-0'+new Date(date).getMonth()+'-'+new Date(date).getDate())
   return new Date(date).getFullYear()+'-'+"0"+new Date(date).getMonth()+'-'+new Date(date).getDate()
  }
  function setfrom(e){
    console.log("target valye",e.target.value)
    setfromDate(e.target.value) 
  }

   const  handleChildClick = (e) =>  {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('handleChildClick');
  }

  console.log("row",rows)
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <RequestTableToolbar numSelected={selected.length} />
       { role == 'admin' ? 
          <div>
            <TextField
            id="date"
            label="From Date"
            type="date"
            defaultValue={displayDate(fromDate)}
            value={fromDate}
            className={classes.textField}
            onChange = {(e,fdate) => setfrom(e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            id="date"
            label="To Date"
            type="date"
            value={toDate}
            defaultValue={displayDate(toDate)}
            onChange = {(e,fdate) => settoDate(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
        </div>
        : null
       }
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <RequestTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowData.length}
            />
            <TableBody style={{position:'relative'}}>
              {
                rows && rows.length < 1 ?
                  <div style={{position:"absolute",right:'45%',top:'40%'}}>
                    <h6 style={{textAlign:'center'}}>
                      No Records found
                    </h6>
                  </div>
                 :
                 null
              }
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell   style={{color:'blue'}} component={Link}
                      to={ "/user/request"} align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.datetime}</TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">{row.carbs}</TableCell>
                      <TableCell align="left">{row.fat}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell onClick={()=>history.push("/user/request")} align="left">{row.btn}</TableCell>
                     
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}