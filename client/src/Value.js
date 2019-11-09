import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const getQuotation = async (orig, dest) => {
    const url = `https://api.exchangeratesapi.io/latest?base=${orig}&symbols=${dest}`;
    const response = await axios.get(url);
    console.log("RESPONSE ", JSON.stringify(response));
    return response.data.rates[dest];
}

const Value = ({origin, dest}) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState();

    getQuotation(origin, dest).then((val) => {
        setValue(val);
        setLoading(false);
    })

    return (
        <div>
            <h1> {loading ? 
                <CircularProgress/> : 
                ("1 " + origin + " = " + value + " " + dest)
                }
            </h1>
        </div>
    )

}

export default Value;