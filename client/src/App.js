import React, {useState} from 'react';
import './App.css';
import Value from './Value';
import { TextField, MenuItem, Box } from '@material-ui/core';


function App() {
  const [origCurrency, setOrigCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("BRL");

  const changeOrig = (event) => {
    setOrigCurrency(event.target.value);
  }

  const changeDest = (event) => {
    setDestCurrency(event.target.value);
  }

  return (
    <div className="App">
      <Box display="flex" justifyContent="space-around" m={5}>
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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'BRL',
    label: 'R$'
  }
];

export default App;
