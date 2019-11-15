import React, {useState} from 'react';
import './App.css';
import Value from './Value';
import { TextField, MenuItem, Box, AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import currencies from './currencyData';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'; 
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
}));

function App() {
  const [origCurrency, setOrigCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("BRL");
  const classes = useStyles();

  const changeOrig = (event) => {
    setOrigCurrency(event.target.value);
  }

  const changeDest = (event) => {
    setDestCurrency(event.target.value);
  }

  const swapCurrencies = () => {
    const aux = origCurrency;
    setOrigCurrency(destCurrency);
    setDestCurrency(aux);
  }

  return (
    <Box className="App" height="100%">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Currency Warner
          </Typography>
          <Link to='/login' className={classes.link}>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="space-around" alignItems="center" m={5}>
        <TextField style={{minWidth: 150}}
          select
          value={origCurrency}
          onChange={changeOrig}
          label="Origin currency"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <SwapHorizIcon 
          fontSize="large"
          onClick={swapCurrencies} 
        />

        <TextField style={{minWidth: 150}}
          select
          value={destCurrency}
          onChange={changeDest}
          label="Destination currency"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Value mt={2} origin={origCurrency} dest={destCurrency}/>
    </Box>
  );
}


export default App;
