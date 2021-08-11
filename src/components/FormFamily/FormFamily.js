import { Button, Paper, TextField, Typography, Grid, IconButton } from '@material-ui/core'
import { People, VpnKey, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'
import useStyles from './styles'
import { useSnackbar } from 'notistack'

function FormFamily({ setCreateFamily, handleAddFamily }) {
    const [family, setFamily] = useState({ name: '', password: '', confirmPassword: '' })
    const [showPass, setShowPass] = useState(false);
    const [ errPassDontMatch, setErrPassDontMatch ] = useState(false);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();


    const handleChange = (e) => {
        setFamily({ ...family, [e.target.name]: e.target.value })
    }
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        try {
            const resAddFamily = await handleAddFamily(family);
            handleNotifyVariant('success', resAddFamily.message)

        } catch (error) {
            if (error.status === 400) {
                handleNotifyVariant('warning', error.message);
            }
        }
    }
    return (
        <Paper className={classes.paper}>
            <Typography align='center'>Crear familia</Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <People />
                    </Grid>
                    <Grid item>
                        <TextField
                            name='name'
                            label='Nombre de familia'
                            type='text'
                            required
                            autoFocus
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end' className={classes.password}>
                        <Grid item>
                            <VpnKey />
                        </Grid>
                        <Grid container item spacing={2}>

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
                                <TextField
                                    name='confirmPassword'
                                    label='Confirme la contraseña'
                                    type={showPass ? 'text' : 'password'}
                                    required
                                    error={errPassDontMatch}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setShowPass(prevState => !prevState)}>
                                {showPass?<VisibilityOff />:<Visibility />}
                            </IconButton>
                        </Grid>
                    </Grid>
                <div className={classes.buttons}>
                    <Button variant='contained' size='small' color='primary' type='submit'>Crear</Button>
                    <Button variant='contained' size='small' color='secondary' onClick={() => setCreateFamily(false)}>Cancelar</Button>
                </div>
            </form>
        </Paper>
    )
}

export default FormFamily
