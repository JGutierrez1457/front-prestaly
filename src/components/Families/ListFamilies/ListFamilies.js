import { Tabs, Tab, Typography, ListSubheader, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function ListFamilies({ families, handleGetFamilies, handleAddMember }) {
    const classes = useStyles();
    const [valueTab, setValueTab] = useState(0);
    const [ newMember, setNewMember ] = useState('');
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
        setNewMember('')
    }
    const onClickAddMember = async ()=>{
       const resAddMember = await handleAddMember(families[valueTab]._id, newMember);
       console.log(resAddMember)
    }
    const handleChange = (e)=>{
        setNewMember(e.target.value)
    }
    useEffect(() => {
        handleGetFamilies()
    }, [handleGetFamilies])
    if (!families) return (<Drawer><h1>Nothing</h1></Drawer>)

    return (
        <Drawer >
            <Typography variant='h6'>Familias</Typography>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={valueTab}
                    onChange={handleChangeTab}
                    arial-label="Tabs Families"
                    className={classes.tabs}
                >
                    {families.map((family, index) => {
                        return <Tab label={family.name} key={index} {...a11yProps(index)} />
                    })}
                </Tabs>
                {families.map((family, index) => {
                    return <TabPanel value={valueTab} key={index} index={index}>
                        <DragDropContext>
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
                                            family.admins.map((admin, index) => {
                                                return <Draggable
                                                    key={admin._id}
                                                    draggableId={'admin'+admin._id}
                                                    index={index}
                                                >{
                                                    (provided)=>(
                                                    <ListItem className={classes.listItem}
                                                        innerRef={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}>
                                                        <ListItemIcon>
                                                            <PersonIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={admin.username} />
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
                                            family.members.map((member, index) => {
                                                return <Draggable
                                                    key={member._id}
                                                    draggableId={'member'+member._id}
                                                    index={index}
                                                >
                                                   {(provided)=>(
                                                    <ListItem className={classes.listItem}
                                                        innerRef={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}>
                                                        <ListItemIcon>
                                                            <PersonIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={member.username} />
                                                    </ListItem>)}
                                                </Draggable>
                                            })
                                        }
                                         {provided.placeholder}
                                    </List>

                                )}
                            </Droppable>
                            <List subheader={
                                        <ListSubheader component='div'>
                                            Agregar miembro
                                        </ListSubheader>
                                    }
                                    className={classes.list}>
                                        <ListItem>
                                            <TextField value={newMember} onChange={handleChange} variant='outlined' label='Ingrese usuario' />
                                            <Button variant='contained' color='primary' onClick={onClickAddMember}>Agregar</Button>
                                        </ListItem>

                            </List>
                        </DragDropContext>

                    </TabPanel>
                })}
            </div>
        </Drawer>

    )
}
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
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
export default ListFamilies