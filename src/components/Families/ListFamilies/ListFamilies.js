import { Tabs, Tab, Typography, CircularProgress, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import CTabPanelFamily from '../../../containers/Families/CTabPanelFamily'
import axios from 'axios'

function ListFamilies({ families, handleGetFamilies }) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();
    const [valueTab, setValueTab] = useState(0);
    const [ loading, setLoading] = useState(true);
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
    useEffect(() => {
        let cancel;
        const getFamilies = async ()=>{
            try {
                await handleGetFamilies(new axios.CancelToken( c => cancel = c))
                setLoading(false)
            } catch (error) {
                if(axios.isCancel(error))return;
            }
        }
        getFamilies();
        return ()=>cancel();
    }, [handleGetFamilies])
    return (
        <Drawer >
            <Typography variant='h6'>Familias</Typography>
            {( loading === true)?(
            <CircularProgress />
            ):(
                (families.length === 0)?(<Drawer><h1>No tienes familias</h1></Drawer>):(
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
                    return <CTabPanelFamily key={index} valueTab={valueTab} idfamily={family._id} index={index} />
                })}
            </div>
                )
                
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