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
}))

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    const classes = useStyles();

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post("/api/register", { username, password, email })
            .then(res => {
                console.log("Callback do register!");
                console.log(res);
                props.history.push('/');
            })
            .catch(e => console.log("Erro no post do registro", e))
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <form onSubmit={handleRegister} className={classes.form}>
                <Typography variant="h3">
                    Register
                    </Typography>
                <TextField className={classes.form_input}
                    required
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)} />
                <TextField className={classes.form_input}
                    required
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    type="password" />
                <TextField className={classes.form_input}
                    required
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    type="email" />
                <Button type="submit"> Submit </Button>
            </form>
            <Grid item xs={6}>
                <Link to='/login'>
                    <Typography> Already registered? Click here to login</Typography>
                </Link>
            </Grid>
        </Grid>
    );
}

export default withRouter(Register);