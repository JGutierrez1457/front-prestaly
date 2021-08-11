import { Tabs, Tab, useMediaQuery, useTheme, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import { cloneElement } from 'react';
import CFormFamily from '../../../containers/Families/CFormFamily';
import { GroupAdd } from '@material-ui/icons';

function ListFamilies({ families, children}) {
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
                {(families.length === 0)?(
                    <>
                    <Typography variant='h6'>No tienes familias</Typography>
                    { !createFamily && <Button startIcon={<GroupAdd />} variant='contained' color ='primary' onClick={()=>setCreateFamily(true)}>Crear familia</Button>}
                    { createFamily && <CFormFamily setCreateFamily={setCreateFamily}/>}
                    </>
                ):(
            <div className={classes.root}>
                <Tabs
                    orientation={xs?"horizontal":"vertical"}
                    variant="scrollable"
                    value={valueTab}
                    onChange={handleChangeTab}
                    arial-label="Tabs Families"
                    className={classes.tabs}
                >
                    {families.map((family, index) => {
                        return <Tab label={family.name} key={index} {...a11yProps(index, xs)} />
                    })}
                </Tabs>
                {families.map((family, index) => {
                        return cloneElement(children, {
                            key : index,
                            valueTab,
                            idfamily : family._id,
                            index
                    })
                })}
            </div>
                )}
        </Drawer>

    )
}
function a11yProps(index, xs) {
    return {
        id: `${xs?'vertical':'scrollable-auto'}-tab-${index}`,
        'aria-controls': `${xs?'vertical':'scrollable-auto'}-tabpanel-${index}`,
      };
}


export default ListFamilies