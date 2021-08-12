import React from 'react';
import clsx from 'clsx';
import { IconButton, Drawer, Divider, List, ListItem, ListItemIcon, 
    ListItemText, Typography, Avatar, CssBaseline } from '@material-ui/core'
import useStyles from './styles';
import { Link,  useHistory } from 'react-router-dom';
import {
    ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon, People as PeopleIcon, LocalAtm as LocalAtmIcon,
    ExitToApp as ExitToAppIcon
} from '@material-ui/icons';
import { LOGOUT, GET_MY_FAMILIES } from '../../constants/actionsTypes';
import { decode } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function MiDrawer({children}) {
    const classes = useStyles();
    const token = useSelector(state => state.auth?.token);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    useEffect(()=>{
        if(token){
            const decodeToken = decode(token);
            if(decodeToken.exp * 1000 < new Date().getTime())logOut();
        }
    })
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const logOut = ()=>{
        dispatch(
            {
                type : LOGOUT
            }
        )
        dispatch({
            type : GET_MY_FAMILIES,
            payload : []
        })
        history.push('/')
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    },classes.paper),
                }}
            >
                    {open ? (
                        <IconButton onClick={handleDrawerClose}
                        classes={{
                            root : clsx(classes.buttonDrawer)
                        }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleDrawerOpen}
                        classes={{
                            root : clsx(classes.buttonDrawer)
                        }}>
                            <ChevronRightIcon />
                        </IconButton>
                    )}
                <Divider />
                <div  className={clsx(classes.containerAvatar ,
                    {
                        [classes.containerAvatarOpen]: open,
                        [classes.containerAvatarClose]: !open
                    } )}  >
                    <Avatar alt='PrestaLy' src={process.env.PUBLIC_URL+'/prestaly.png'}
                         className={clsx({
                                [classes.avatarOpen]: open,
                                [classes.avatarClose]: !open
                            })
                        } 
                        />
                    <Typography variant='h5' align='center'  className={clsx(classes.title)} >
                        PrestaLy
                    </Typography>
                        </div>
                <Divider />
                <List>
                    <ListItem button key={'Mis familias'} component={Link} to={`/families`} >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Mis familias'} />
                    </ListItem>
                    <ListItem button key={'Mis prestamos'} component={Link} to={`/board`}>
                        <ListItemIcon>
                            <LocalAtmIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Mis prestamos'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key='logout' onClick={logOut}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary='Salir' />
                    </ListItem>
                </List>
            </Drawer>
            <main className={clsx(classes.content)}>
                        {children}
            </main>
        </div>
    );
}
