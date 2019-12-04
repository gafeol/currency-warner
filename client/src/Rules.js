import React, {useState} from 'react';
import {Grid, TextField, MenuItem, Button} from '@material-ui/core';
import axios from 'axios';
import currencies from './currencyData'

const Rules = (props) => {
    const [origCurr, setOrigCurr] = useState("USD");
    const [destCurr, setDestCurr] = useState("BRL");

    const handleRuleCreation = () => {
        axios.post('/api/rule', )
        // TODO: Continuar colocando a request pra criacao de regra
    }
    return (
        <Grid container>
            <form onSubmit={handleRuleCreation}>
                <TextField style={{minWidth: 150}}
                    select
                    id="origCurr"
                    label="Original Currency"
                    value={origCurr}
                    onChange={(ev)=>setOrigCurr(ev.target.value)}>
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                <TextField style={{ minWidth: 150 }}
                    select
                    id="destCurr"
                    label="Destination Currency"
                    value={destCurr}
                    onChange={ev => setDestCurr(ev.target.value)}>
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </Grid>
    );
}

export default Rules;