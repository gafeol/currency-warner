import React, { useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
    },
    form_input: {
        marginTop: 10,
        marginBottom: 10,
        minWidth: 300
    },
    container: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 100,
        marginRight: 100,
    }
}))

const Secret = (props) => {
    return (
        <Typography variant="h3">
            SECRET
        </Typography> 
    );
}

export default withRouter(Secret);