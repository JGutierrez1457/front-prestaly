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
import { LOGOUT } from '../../constants/actionsTypes'
import { useDispatch } from 'react-redux';


export default function MiDrawer({children}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const logOut = ()=>{
        dispatch(
            {
                type : LOGOUT
            }
        )
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
                    <Avatar alt='PrestaLy' src={process.env.PUBLIC_URL+'/prestaly.jpg'}
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
                    <ListItem button key={'Mis prestamos'} component={Link} to={`/loans`}>
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
