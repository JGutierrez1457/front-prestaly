import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'

function SignIn({handleLogin, handleGetFamilies}) {
    const history = useHistory();
    const classes = useStyles();
    const [ userData, setUserData ] = useState({username : '', password : ''});
    const onLogin =async ()=>{
        const resLogin = await handleLogin(userData)
        const resFamilies = await handleGetFamilies();
        console.log(resFamilies)
        if(resLogin.severity === 'success'){history.push('/families')}
    }
    const handleChange = (e)=>{
        setUserData({...userData, [e.target.name] : e.target.value })
    }
    return (
        <div className={classes.containerPaper}>
        <Paper className={classes.paper}>
            <Typography variant='h6' align='center'>Login</Typography>
            <TextField 
                variant='outlined' 
                name='username' 
                autoFocus 
                label='Ingrese su usuario'
                type='text'
                required 
                fullWidth
                onChange={handleChange}
                />
            <TextField 
                variant='outlined' 
                name='password'  
                label='Ingrese su contraseña'
                type='password'
                required 
                fullWidth
                onChange={handleChange}
                />
            <Button color='primary' variant='contained' onClick={onLogin}>Ingresar</Button>
        </Paper>
        </div>
    )
}

export default SignIn