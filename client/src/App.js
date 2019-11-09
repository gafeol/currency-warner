import React, {useState} from 'react';
import './App.css';
import Value from './Value';
import { TextField, MenuItem, Box } from '@material-ui/core';
import currencies from './currencyData';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'; 


function App() {
  const [origCurrency, setOrigCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("BRL");

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
    <div className="App">
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
    </div>
  );
}


export default App;
