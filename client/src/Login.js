import React, { useState } from 'react'
import { Grid, TextField, Button, Typography, makeStyles } from '@material-ui/core';
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

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();
    const classes = useStyles();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("/api/login", {username, password})
            .then(res => {
                props.history.push('/');
            })
            .catch(e => console.log("Erro no post do login", e));
    }
    
    return (
        <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <form onSubmit={handleLogin} className={classes.form}>
                <Typography variant="h3">
                    Login
                    </Typography> 
                <TextField className={classes.form_input}
                    required
                    id="username"
                    label="Username" 
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}/>
                <TextField className={classes.form_input}
                    required
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    type="password" />
                <Button type="submit"> Submit </Button>
            </form>
            <Grid item xs={6}>
                <Link to='/register'>
                    <Typography> Don't have an account? Click here to register!</Typography>
                </Link>
            </Grid>
        </Grid>
    );
}

export default withRouter(Login);