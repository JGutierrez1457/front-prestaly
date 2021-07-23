import React, { useState, useEffect } from 'react'
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { Delete as DeleteIcon, Person as PersonIcon } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function TabPanelFamily({ families, family, index, setValueTab, handleAddMember, handleRemoveMember, handleAddAdmin, handleRemoveAdmin, valueTab }) {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector( state => state.auth.auth.result.username)
    const originalAdmins = Array.from(family.admins.map(member => member.username))
    const originalMembers = Array.from(family.members.map(member => member.username))

    const [ loading, setLoading ] = useState(false);
    const [changed, setChanged ] = useState(false)
    const [admins, setAdmins] = useState(family.admins.map(admin => admin.username));
    const [members, setMembers] = useState(family.members.map(member => member.username));
    const [trashMembers, setTrashMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [showDroppTrash, setShowDroppTrash] = useState(false);
   /*  useEffect(()=>{
        setMembers(family.members.map(member => member.username))
        setAdmins(family.admins.map(admin => admin.username))
    },[family]) */
    useEffect(()=>{
    if( !equalIgnoreOrder(admins, originalAdmins) || 
        !equalIgnoreOrder(members, originalMembers) || 
        (trashMembers.length !== 0)  ){
            setChanged(true)
        }
        else{
            setChanged(false)
        }

    },[admins, members, trashMembers, originalAdmins, originalMembers])

    const onClickAddMember = async () => {
        setLoading(true);
        const resAddMember = await handleAddMember(families[valueTab]._id, newMember);
        setNewMember('')
        setMembers([...members, newMember])
        setLoading(false);
        console.log(resAddMember)
    }
    const handleChange = (e) => {
        setNewMember(e.target.value)
    }
    const handleOnBeforeCapture = ({ draggableId }) => {
        setShowDroppTrash(true);
    }
    const removeChanges = ()=>{
        setAdmins(family.admins.map(admin => admin.username));
        setMembers(family.members.map(member => member.username));
        setTrashMembers([]);
        setChanged(false);
        setShowDroppTrash(false);
    }
    const onClickChange = async ()=>{
        setLoading(true);
        const removeMembers = originalMembers.filter( x => !members.includes(x));
        const removeAdmins = originalAdmins.filter( x => !admins.includes(x));
        const addAdmins = admins.filter( x => !originalAdmins.includes(x));
        var resRemoveAdmins = []
        var resRemoveMembers = []
        var resAddAdmins = []
        for(let removeAdmin of removeAdmins){
            resRemoveAdmins.push(await handleRemoveAdmin(families[valueTab]._id, removeAdmin ));
        }
        for(let removeMember of removeMembers){
            resRemoveMembers.push(await handleRemoveMember(families[valueTab]._id, removeMember ));
        }
        for(let addAdmin of addAdmins){
            resAddAdmins.push(await handleAddAdmin(families[valueTab]._id, addAdmin ));
        }
       /*  const resRemoveAdmins = await Promise.all(promiseRemoveAdmins);
        const resRemoveMembers = await Promise.all(promiseRemoveMembers);
        const resAddAdmins = await Promise.all(promiseAddAdmins); */

        if(removeMembers.some( res => res === user )){
            history.push('/');
            return;
        }
        setTrashMembers([]);
        setShowDroppTrash(false);
        setChanged(false);
        setAdmins(admins);
        setMembers(members)
        setLoading(false);
        console.log(resRemoveAdmins, resRemoveMembers, resAddAdmins)
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
        if(destination.droppableId === 'trash' && source.droppableId === 'admins'){
            if( copyAdmins.length > 1 ){
                copyAdmins.splice(source.index, 1);
                setAdmins(copyAdmins);
                copyMembers.splice(copyMembers.findIndex(member => member === draggableId.split(' ')[1]),1 )
                setMembers(copyMembers);
                copyTrashMembers.splice(destination.index, 0, draggableId.split(' ')[1]);
                setTrashMembers(copyTrashMembers);
                setShowDroppTrash(true);
                setChanged(true)

            }
        }
        if(destination.droppableId === 'trash' && source.droppableId === 'members'){
            const isAdmin = copyAdmins.some( admin => admin === draggableId.split(' ')[1]);
            if( copyMembers.length > 1 && ( copyAdmins.length > 1 || !isAdmin ) ){
                copyMembers.splice(source.index, 1);
                setMembers(copyMembers);

                if(isAdmin){
                    copyAdmins.splice(copyAdmins.findIndex(admin => admin === draggableId.split(' ')[1]),1 )
                    setAdmins(copyAdmins);
                }

                copyTrashMembers.splice(destination.index, 0, draggableId.split(' ')[1]);
                setTrashMembers(copyTrashMembers);
                setShowDroppTrash(true);
                setChanged(true)

            }
        }
        if(destination.droppableId === 'admins' && source.droppableId === 'trash'){
            copyAdmins.splice(destination.index, 0, draggableId.split(' ')[1]);
            copyMembers.push(draggableId.split(' ')[1]);

            copyTrashMembers.splice(source.index, 1);

            setAdmins(copyAdmins);
            setMembers(copyMembers);
            setTrashMembers(copyTrashMembers);
            if (copyTrashMembers.length === 0) setShowDroppTrash(false)

        }
        if(destination.droppableId === 'members' && source.droppableId === 'trash'){
            copyMembers.splice(destination.index, 0, draggableId.split(' ')[1]);

            copyTrashMembers.splice(source.index, 1);

            setMembers(copyMembers);
            setTrashMembers(copyTrashMembers);
            if (copyTrashMembers.length === 0) setShowDroppTrash(false)

        }


    }
    return (
        <>
        <Backdrop open={loading} className={classes.backcrop}>
            <CircularProgress color='inherit' />
        </Backdrop>
        <TabPanel value={valueTab} key={index} index={index}>
            <DragDropContext onBeforeCapture={handleOnBeforeCapture} onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='admins' direction='horizontal'>
                    {(provided, snapshot) => (
                        <List subheader={
                            <ListSubheader component='div'>
                                Administradores
                            </ListSubheader>
                        }
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
                                                        <PersonIcon style={{ fill : user===admin?'#3f51b5':''}} />
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
                </Droppable>
                <Droppable droppableId='members' direction='horizontal'>
                    {(provided, snapshot) => (
                        <List subheader={
                            <ListSubheader component='div'>
                                Miembros
                            </ListSubheader>
                        }
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
                                                    <PersonIcon style={{ fill : user===member?'#3f51b5':''}}  />
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
                {showDroppTrash && <Droppable droppableId='trash' direction='horizontal'>
                    {(provided, snapshot) => (
                        <List subheader={
                            <ListSubheader component='div'>
                                <DeleteIcon style={{ fill: '#f44336' }} />
                            </ListSubheader>
                        }
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
                                                    <PersonIcon style={{ fill : user===member?'#3f51b5':''}} />
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
                {changed && <List 
                    className={classes.listButtons}>
                    <ListItem>
                        <Button variant='contained' color='primary' onClick={onClickChange}>Aceptar</Button>
                        <Button variant='contained' color='secondary' onClick={removeChanges}>Cancelar</Button>
                    </ListItem>

                </List>}
                <List subheader={
                    <ListSubheader component='div'>
                        Agregar miembro
                    </ListSubheader>
                }
                    className={classes.list}>
                    <ListItem>
                        <TextField value={newMember} onChange={handleChange} disabled={changed} variant='outlined' label='Ingrese usuario' />
                        <Button variant='contained' color='primary' disabled={changed} onClick={onClickAddMember}>Agregar</Button>
                    </ListItem>

                </List>
            </DragDropContext>

        </TabPanel>
        </>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
function equalIgnoreOrder (a, b){
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}
export default TabPanelFamily
