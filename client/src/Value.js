import React, { useState } from 'react';
import axios from 'axios';

async function getQuotation(){
    const url = "https://api.exchangeratesapi.io/latest?base=CHF&symbols=BRL"
    const response = await axios.get(url)
    console.log("RESPONSE ", JSON.stringify(response));
    return response.data.rates.BRL;
}

const Value = () => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(1);
    getQuotation().then((val) => {
        setValue(val);
        setLoading(false)
    })
    return (
        <div>
            <h1> {loading ? 
                "Loading..." : 
                ("1 CHF = " + value + " BRL")
                }
            </h1>
        </div>
    )

}

export default Value;