import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography, Input } from '@material-ui/core';
import axios from 'axios';
import currencies from './currencyData';
import { checkAuth } from './auth';

const style = {
    TextField: {
        minWidth: 150,
        margin: 8
    }
}

const Rules = ({user}) => {
    const [origCurr, setOrigCurr] = useState("USD");
    const [destCurr, setDestCurr] = useState("BRL");
    const [thresholdValue, setThreshold] = useState(0);
    const [rules, setRules] = useState(null);

    useEffect(() => {
        if (rules === null) {
            axios.get("/api/userRules")
                .then(res => {
                    console.log("Set rules ", res.data.rules);
                    setRules(res.data.rules);
                })
                .catch(err => console.log("Erro pegando rules ", err));
        }
    })

    const handleRuleCreation = () => {
        axios.post('/api/rules', {
            user: user._id,
            origCurr: origCurr,
            destCurr: destCurr,
            thresholdValue: thresholdValue
        }).then(res => {
            console.log("Callback deu res ", res);
        }).catch(err => console.log("Erro na criacao ", err));
        //Issue: TODO: Quando o usuario nao ta logado a aplicacao nao faz nada
        // Nao cai em nenhum catch ou then, nem redireciona pro login
    }

    return (
        <Box>
            <Box>
                <Typography variant="h4">
                    {user ? `Your (${user.username}) rules` : "Create a rule:"}
                </Typography>
                <form onSubmit={handleRuleCreation}>
                    <Box>
                        <TextField style={style.TextField}
                            select
                            id="origCurr"
                            label="Original Currency"
                            value={origCurr}
                            onChange={(ev) => setOrigCurr(ev.target.value)}>
                            {currencies.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Input style={style.TextField}
                            id="thresholdValue"
                            label="warn me when it is less than:"
                            onChange={ev => setThreshold(ev.target.value)}>
                        </Input>
                        <TextField style={style.TextField}
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
                    </Box>
                    <Button type="submit">
                        Submit
                </Button>
                </form>
            </Box>
            <Box>
                {rules ? (rules.map(rule => (
                    <Typography variant="h6">
                        Warn me when 1 {rule.origCurr} is cheaper then {rule.thresholdValue} {rule.destCurr}
                    </Typography>
                ))) : 
                null
                }
                {/* TODO: Melhorar esta pourra de ui */}
            </Box>
        </Box>
    );
}

export default checkAuth(Rules);