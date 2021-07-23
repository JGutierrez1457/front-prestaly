import { Tabs, Tab, Typography, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Drawer from '../../Drawer/Drawer'
import useStyles from './styles'
import CTabPanelFamily from '../../../containers/Families/CTabPanelFamily'

function ListFamilies({ families, handleGetFamilies }) {
    const classes = useStyles();
    const [valueTab, setValueTab] = useState(0);
    const [ loading, setLoading] = useState(true);
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
    useEffect(() => {
        const getFamilies = async ()=>{
            await handleGetFamilies()
            setLoading(false)
        }
        getFamilies();
    }, [handleGetFamilies])
    return (
        <Drawer >
            <Typography variant='h6'>Familias</Typography>
            {loading && <CircularProgress />}
            {(families.length === 0 && loading === false)?(
                <Drawer><h1>No tienes familias</h1></Drawer>
            ):(
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
                    return <CTabPanelFamily key={index} valueTab={valueTab} idfamily={family._id} index={index} setValueTab={setValueTab} />
                })}
            </div>
            )}
        </Drawer>

    )
}
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default ListFamilies