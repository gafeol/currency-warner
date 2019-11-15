import React, { useState } from 'react'
import { Box, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';

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

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    const classes = useStyles();

    const handleRegister = (e) => {
        console.log("Registered");
        e.preventDefault();

        axios.post("/api/register", {username, password, email})
            .then(res => {
            })
            .catch(e => console.log("Erro no post do registro", e))
    }
    
    return (
        <Box className={classes.container} height="100%" bgcolor="grey.300">
            <form onSubmit={handleRegister} className={classes.form}>
                <Typography variant="h3">
                    Register
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
                <TextField className={classes.form_input}
                    required
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    type="email" />
                <Button type="submit"> Submit </Button>
            </form>
        </Box>
    );
}

export default Login;