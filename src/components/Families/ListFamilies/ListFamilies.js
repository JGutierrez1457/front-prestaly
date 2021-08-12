import { Tabs, Tab, useMediaQuery, useTheme, Typography, Button, AppBar } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import { cloneElement } from 'react';
import CFormFamily from '../../../containers/Families/CFormFamily';
import { GroupAdd } from '@material-ui/icons';

function ListFamilies({ families, children, members}) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();
    const [ valueTab, setValueTab] = useState(0);
    const [ createFamily, setCreateFamily] = useState(false);
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
    return (
        <Drawer >
                {(families?.length === 0)?(
                    <Typography variant='h6'>No tienes familias</Typography>
                ):(
            <div className={classes.root}>
                { xs?(
                    <AppBar position='static' color='default'>
                    <Tabs
                           value={valueTab}
                           variant='scrollable'
                           onChange={handleChangeTab}
                           arial-label="Tabs Families"
                           scrollButtons='on'
                           indicatorColor="primary"
                           textColor="primary"
                           className={classes.tabs}
                       >
                           {families?.map((family, index) => {
                               return <Tab label={family.name} key={index} {...a11yProps(index, xs)} />
                           })}
                       </Tabs>
                       </AppBar>
                ):(
                    <Tabs
                           orientation="vertical"
                           variant="scrollable"
                           value={valueTab}
                           onChange={handleChangeTab}
                           arial-label="Tabs Families"
                           className={classes.tabs}
                       >
                           {families?.map((family, index) => {
                               return <Tab label={family.name} key={index} {...a11yProps(index, xs)} />
                           })}
                       </Tabs>
                )}
             

                {families?.map((family, index) => {
                        return cloneElement(children, {
                            key : index,
                            valueTab,
                            idfamily : family._id,
                            index
                    })
                })}
            </div>
                )}
                {members && <div style={{display: 'flex', justifyContent : 'center'}} >
                { !createFamily && <Button 
                    startIcon={<GroupAdd />} 
                    variant='contained' 
                    color ='primary' 
                    onClick={()=>setCreateFamily(true)}
                    style={{marginTop : '16px'}}
                    >Crear familia</Button>}
            { createFamily && <CFormFamily setCreateFamily={setCreateFamily}/>}
                </div>}
        </Drawer>

    )
}
function a11yProps(index, xs) {
    return {
        id: `${xs?'scrollable-force':'vertical'}-tab-${index}`,
        'aria-controls': `${xs?'scrollable-force':'vertical'}-tabpanel-${index}`,
      };
}


export default ListFamilies