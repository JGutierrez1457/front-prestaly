import { Button, Paper, TextField, Typography, Grid, IconButton, CircularProgress } from '@material-ui/core';
import { AccountCircle, VpnKey, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useSnackbar } from 'notistack'


function SignIn({ handleLogin }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [showPass, setShowPass] = useState(false);
    const [load, setLoad] = useState(false);

    const [userData, setUserData] = useState({ username: '', password: '' });
    useEffect(() => () => {
        document.body.style.backgroundImage = null;
        document.body.style.backgroundColor = null;
        document.body.style.backgroundAttachment = null;
        document.body.style.backgroundSize = null;
    }, [])
    useEffect(() => {
        document.body.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.51' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23eb0000'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23eb0000'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(34.75) translate(-971.22 -728.42)'%3E%3Cg fill='%23eb0000'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`;
        document.body.style.backgroundColor = '#ffffff'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundSize = 'cover'
    }, [])
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            setLoad(true);
            const resLogin = await handleLogin(userData)
            handleNotifyVariant('success', resLogin)
        } catch (error) {
            if (error.status === 400) {
                setLoad(false)
                handleNotifyVariant('warning', error.message);
            }
            if (error.status === 404) {
                setLoad(false)
                handleNotifyVariant('error', error.message);
            }
        }
    }
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    return (
        <div className={classes.containerPaper}>
            <Link to='/'>
                <img src={process.env.PUBLIC_URL + '/prestalyname.png'} alt='Prestaly Name' />
            </Link>
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>Ingresar</Typography>
                <form onSubmit={onLogin}>
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField
                                name='username'
                                label='Usuario'
                                type='text'
                                required
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <VpnKey />
                        </Grid>
                        <Grid item>
                            <TextField
                                name='password'
                                label='Contraseña'
                                type={showPass ? 'text' : 'password'}
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setShowPass(prevState => !prevState)}>
                                {showPass?<VisibilityOff />:<Visibility />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Button size='small' color='primary' variant='contained' type='submit' disabled={load}>
                        Ingresar
                        {load && <CircularProgress color='inherit'  style={{ height : '15px', width : '15px', marginLeft : '8px'}} />}
                        </Button>
                </form>
                <Typography variant='body2'>Si no se encuentra registrado, puede hacerlo desde aquí <Link to='/signup'>registrarse</Link></Typography>
            </Paper>
        </div>
    )
}

export default SignIn