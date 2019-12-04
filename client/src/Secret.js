import React from 'react'
import { Typography, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ensureAuth } from './auth';

const Secret = (props) => {
    console.log("PROPS", props)
    return (
        <Box>
            <Typography variant="h3">
                SECRET
            </Typography>
            <Typography>
                Your username: {props.user.username}
            </Typography>
            <Typography>
                Your email: {props.user.email}
            </Typography>
        </Box>
    );
}

export default ensureAuth(withRouter(Secret));