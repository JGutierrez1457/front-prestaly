import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, TextField, Button, Backdrop, 
    CircularProgress, Typography, useTheme, useMediaQuery, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Delete as DeleteIcon, Person as PersonIcon } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios'


function TabPanelMembers({ families, family, index,handleGetMembersFamily, handleAddMember, handleRemoveMember, handleAddAdmin, handleRemoveAdmin, handleDeleteFamily, valueTab }) {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.auth.user.username);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [passFamily, setPassFamily] = useState('');

    const originalAdmins = Array.from(family?.admins?.map(admin => admin.username) || [])
    const originalMembers = Array.from(family?.members?.map(member => member.username) || [])
    const creator = family?.creator?.username;
    const idFamily = family?._id;

    const { enqueueSnackbar } = useSnackbar();

    const [loadingMembers, setLoadingMembers] = useState(false);
    const [loadingBack, setLoadingBack] = useState(false);
    const [changed, setChanged] = useState(false)
    const [admins, setAdmins] = useState(family?.admins?.map(admin => admin.username) || []);
    const [members, setMembers] = useState(family?.members?.map(member => member.username) || []);
    const [trashMembers, setTrashMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [showDroppTrash, setShowDroppTrash] = useState(false);
    const [openDeleteFamily, setOpenDeleteFamily] = useState(false);
    useEffect(() => {
        let cancel;
        const getMembers = async ()=>{
            try {
                setLoadingMembers(true);
                await handleGetMembersFamily(new axios.CancelToken( c => cancel = c),idFamily )
                setLoadingMembers(false);
            } catch (error) {
                if(axios.isCancel(error))return;
            }
        }
        getMembers();
        return ()=>cancel();
    }, [handleGetMembersFamily, idFamily])
    useEffect(() => {
        if (!equalIgnoreOrder(admins, originalAdmins) ||
            !equalIgnoreOrder(members, originalMembers) ||
            (trashMembers.length !== 0)) {
            setChanged(true)
        }
        else {
            setChanged(false)
        }

    }, [admins, members, trashMembers, originalAdmins, originalMembers, family])
    useEffect(() => {
        setAdmins(family?.admins?.map(admin => admin.username) || []);
        setMembers(family?.members?.map(member => member.username) || [])
    }, [family, loadingMembers])
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    const handleOpenDeleteFamily =()=>{
        setOpenDeleteFamily(true)
    }
    const handleCloseDeleteFamily =()=>{
        setPassFamily('')
        setOpenDeleteFamily(false)
    }
    const onDeleteFamily =async ()=>{
        try {
            const resDeleteFamily = await handleDeleteFamily(family._id, passFamily );
            handleNotifyVariant('success', resDeleteFamily)
            handleCloseDeleteFamily();
            history.push('/')
        } catch (error) {
            if (error.status === 400) {
                handleNotifyVariant('warning', error.message);
            }
        }
    }
    const onClickAddMember = async (e) => {
        e.preventDefault();
        try {
            setLoadingBack(true);
            const text = await handleAddMember(families[valueTab]._id, newMember);
            setMembers([...members, newMember])
            handleNotifyVariant('success', text);
        } catch (error) {
            if (error.status === 400) {
                handleNotifyVariant('warning', error.message);
            }
            if (error.status === 404) {
                handleNotifyVariant('error', error.message);
            }
        } finally {
            setNewMember('')
            setLoadingBack(false);
        }
    }
    const handleChange = (e) => {
        setNewMember(e.target.value)
    }
    const handleOnBeforeCapture = ({ draggableId }) => {
        setShowDroppTrash(true);
    }
    const removeChanges = () => {
        setAdmins(family.admins.map(admin => admin.username));
        setMembers(family.members.map(member => member.username));
        setTrashMembers([]);
        setChanged(false);
        setShowDroppTrash(false);
    }
    const onClickChange = async () => {
        setLoadingBack(true);
        const removeMembers = originalMembers.filter(x => !members.includes(x));
        const removeAdmins = originalAdmins.filter(x => !admins.includes(x));
        const addAdmins = admins.filter(x => !originalAdmins.includes(x));
        for (let removeAdmin of removeAdmins) {
            try {
                const text = await handleRemoveAdmin(families[valueTab]._id, removeAdmin);
                handleNotifyVariant('success', text)
            } catch (error) {
                if (error.status === 400) {
                    handleNotifyVariant('warning', error.message);
                }
                if (error.status === 404) {
                    handleNotifyVariant('error', error.message);
                }
            }
        }

        for (let removeMember of removeMembers) {
            try {
                const text = await handleRemoveMember(families[valueTab]._id, removeMember);
                handleNotifyVariant('success', text)
            } catch (error) {
                if (error.status === 400) {
                    handleNotifyVariant('warning', error.message);
                }
                if (error.status === 404) {
                    handleNotifyVariant('error', error.message);
                }
            }
        }

        for (let addAdmin of addAdmins) {
            try {
                const text = await handleAddAdmin(families[valueTab]._id, addAdmin)
                handleNotifyVariant('success', text)
            } catch (error) {
                if (error.status === 400) {
                    handleNotifyVariant('warning', error.message);
                }
                if (error.status === 404) {
                    handleNotifyVariant('error', error.message);
                }
            }
        }
        if (removeMembers.some(res => res === user)) {
            history.push('/');
            return;
        }
        setTrashMembers([]);
        setShowDroppTrash(false);
        setChanged(false);
        setLoadingBack(false);


    }
    const handleOnDragEnd = (result) => {
        var copyAdmins = admins;
        var copyMembers = members;
        var copyTrashMembers = trashMembers;
        if (copyTrashMembers.length === 0) setShowDroppTrash(false)
        const { destination, source, draggableId } = result;
        if (!destination) return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        if (destination.droppableId === 'admins' && source.droppableId === 'members') {
            if (copyAdmins.some(admin => admin === draggableId.split(' ')[1])) return
            copyAdmins.splice(destination.index, 0, draggableId.split(' ')[1])
            setAdmins(copyAdmins)
        }
        if (destination.droppableId === 'members' && source.droppableId === 'admins') {
            if (copyMembers.some(member => member === draggableId.split(' ')[1]) && copyAdmins.length > 1) {
                copyAdmins.splice(source.index, 1)
                setAdmins(copyAdmins);
                return;
            } else if (copyMembers.some(member => member === draggableId.split(' ')[1]) && copyAdmins.length === 1) {
                return;
            }
            copyMembers.splice(destination.index, 0, draggableId.split(' ')[1])
            setMembers(copyMembers)
        }
        if (destination.droppableId === 'trash' && source.droppableId === 'admins') {
            if (copyAdmins.length > 1) {
                copyAdmins.splice(source.index, 1);
                setAdmins(copyAdmins);
                copyMembers.splice(copyMembers.findIndex(member => member === draggableId.split(' ')[1]), 1)
                setMembers(copyMembers);
                copyTrashMembers.splice(destination.index, 0, draggableId.split(' ')[1]);
                setTrashMembers(copyTrashMembers);
                setShowDroppTrash(true);
                setChanged(true)

            }
        }
        if (destination.droppableId === 'trash' && source.droppableId === 'members') {
            const isAdmin = copyAdmins.some(admin => admin === draggableId.split(' ')[1]);
            if (copyMembers.length > 1 && (copyAdmins.length > 1 || !isAdmin)) {
                copyMembers.splice(source.index, 1);
                setMembers(copyMembers);

                if (isAdmin) {
                    copyAdmins.splice(copyAdmins.findIndex(admin => admin === draggableId.split(' ')[1]), 1)
                    setAdmins(copyAdmins);
                }

                copyTrashMembers.splice(destination.index, 0, draggableId.split(' ')[1]);
                setTrashMembers(copyTrashMembers);
                setShowDroppTrash(true);
                setChanged(true)

            }
        }
        if (destination.droppableId === 'admins' && source.droppableId === 'trash') {
            copyAdmins.splice(destination.index, 0, draggableId.split(' ')[1]);
            copyMembers.push(draggableId.split(' ')[1]);

            copyTrashMembers.splice(source.index, 1);

            setAdmins(copyAdmins);
            setMembers(copyMembers);
            setTrashMembers(copyTrashMembers);
            if (copyTrashMembers.length === 0) setShowDroppTrash(false)

        }
        if (destination.droppableId === 'members' && source.droppableId === 'trash') {
            copyMembers.splice(destination.index, 0, draggableId.split(' ')[1]);

            copyTrashMembers.splice(source.index, 1);

            setMembers(copyMembers);
            setTrashMembers(copyTrashMembers);
            if (copyTrashMembers.length === 0) setShowDroppTrash(false)

        }


    }
    return (
        <>
            <Backdrop open={loadingBack} className={classes.backdrop}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <TabPanel value={valueTab} key={index} index={index} className={classes.root}>
                { loadingMembers?<CircularProgress />:
                (
                    <>
                <Typography variant='body2' style={{ fontStyle: 'italic' }} align='center' color='textSecondary'>Creador {creator}</Typography>
                {user === creator  &&<><IconButton className={classes.deleteFamily} onClick={handleOpenDeleteFamily}>
                    <DeleteIcon style={{ fill : '#f44336'}} />
                </IconButton>
                
                <Dialog fullWidth={xs} maxWidth={xs?'xs':'sm'} open={openDeleteFamily} onClose={handleCloseDeleteFamily}>
                    <DialogTitle>Eliminar familia</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Al eliminar la familia, eliminará todos los balances y prestamos aún no balanceados. Si está seguro, ingrese la contraseña ingresada al momento de crear la familia.
                        </DialogContentText>
                        <TextField autoFocus label="Contraseña de familia" type='text' value={passFamily} required onChange={(e)=>setPassFamily(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button size='small' color='secondary' variant='contained' onClick={onDeleteFamily}>Eliminar</Button>
                        <Button size='small' color='default' onClick={handleCloseDeleteFamily}>Cancelar</Button>
                    </DialogActions>
                </Dialog>
                </>}
                <DragDropContext onBeforeCapture={handleOnBeforeCapture} onDragEnd={handleOnDragEnd}>
                    <div className={classes.containerList}>
                        <Typography color='textSecondary'>Administradores</Typography>
                        {admins && <Droppable droppableId='admins' direction='horizontal'>

                            {(provided, snapshot) => (
                                <List
                                    className={classes.list}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {
                                        admins.map((admin, index) => {
                                            return <Draggable
                                                key={admin}
                                                draggableId={'admin ' + admin}
                                                index={index}
                                            >{
                                                    (provided) => (
                                                        <ListItem className={classes.listItem}
                                                            innerRef={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}>
                                                            <ListItemIcon>
                                                                <PersonIcon style={{ fill: user === admin ? '#3f51b5' : '' }} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={admin} />
                                                        </ListItem>
                                                    )
                                                }
                                            </Draggable>
                                        })
                                    }
                                    {provided.placeholder}
                                </List>

                            )}
                        </Droppable>}
                    </div>
                    <div className={classes.containerList}>
                        <Typography color='textSecondary'>Miembros</Typography>
                        {members && <Droppable droppableId='members' direction='horizontal'>
                            {(provided, snapshot) => (
                                <List
                                    className={classes.list}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {
                                        members.map((member, index) => {
                                            return <Draggable
                                                key={member}
                                                draggableId={'member ' + member}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <ListItem className={classes.listItem}
                                                        innerRef={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}>
                                                        <ListItemIcon>
                                                            <PersonIcon style={{ fill: user === member ? '#3f51b5' : '' }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={member} />
                                                    </ListItem>)}
                                            </Draggable>
                                        })
                                    }
                                    {provided.placeholder}
                                </List>

                            )}
                        </Droppable>}
                    </div>
                    {showDroppTrash &&
                        <div className={classes.containerListTrash}>
                            <DeleteIcon style={{ fill: '#f44336' }} />
                            <Droppable droppableId='trash' direction='horizontal'>
                                {(provided, snapshot) => (
                                    <List
                                        className={classes.listTrash}
                                        innerRef={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {
                                            trashMembers.map((member, index) => {
                                                return <Draggable
                                                    key={member}
                                                    draggableId={'trash ' + member}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <ListItem className={classes.listItem}
                                                            innerRef={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}>
                                                            <ListItemIcon>
                                                                <PersonIcon style={{ fill: user === member ? '#3f51b5' : '' }} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={member} />
                                                        </ListItem>)}
                                                </Draggable>
                                            })
                                        }
                                        {provided.placeholder}
                                    </List>

                                )}
                            </Droppable>
                        </div>

                    }
                    {changed && <List>
                        <ListItem className={classes.listButtons}>
                            <Button variant='contained' color='primary' onClick={onClickChange}>Aceptar</Button>
                            <Button variant='contained' color='secondary' onClick={removeChanges}>Cancelar</Button>
                        </ListItem>

                    </List>}
                    <div className={classes.containerList}>
                        <Typography color='textSecondary'>Agregar miembro</Typography>
                        <List>
                            <ListItem>
                                <form className={classes.listButton} onSubmit={onClickAddMember} >
                                    <TextField value={newMember} required onChange={handleChange} disabled={changed} variant='outlined' label='Ingrese usuario' />
                                    <Button variant='contained' size='small' color='primary' disabled={changed} type='submit'>Agregar</Button>
                                </form>
                            </ListItem>

                        </List>
                    </div>
                </DragDropContext>
                    </>
                )
                }

            </TabPanel>
        </>
    )
}
function TabPanel(props) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${xs ? 'vertical' : 'scrollable-force'}-tabpanel-${index}`}
            aria-labelledby={`${xs ? 'vertical' : 'scrollable-force'}-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}
function equalIgnoreOrder(a, b) {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
        const aCount = a.filter(e => e === v).length;
        const bCount = b.filter(e => e === v).length;
        if (aCount !== bCount) return false;
    }
    return true;
}
export default TabPanelMembers
