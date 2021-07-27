import { Tabs, Tab, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import { cloneElement } from 'react';

function ListFamilies({ families, children}) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();
    const [ valueTab, setValueTab] = useState(0);
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
    return (
        <Drawer >
            <Typography variant='h6' align='center'>Familias</Typography>
                {(families.length === 0)?(<Drawer><h1>No tienes familias</h1></Drawer>):(
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