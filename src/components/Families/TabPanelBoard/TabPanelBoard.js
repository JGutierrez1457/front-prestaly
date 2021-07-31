import { Typography, Accordion, AccordionSummary, AccordionDetails,useTheme, useMediaQuery, Button, AccordionActions, Divider } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CListBalances from '../../../containers/Balances/CListBalances';
import CAddLoan from '../../../containers/Loans/CAddLoan';
import CListLoans from '../../../containers/Loans/CListLoans';
import useStyles from './styles'

function TabPanelBoard({ families, family, index, valueTab, getPDFNoBalanceds, onGenerateBalance }) {
    const [ expanded, setExpanded ] = useState(false);
    const [ areLoans, setAreLoans ] = useState(false);
    const [ addLoan, setAddLoan ] =useState(false);
    const history = useHistory();
    const handleExpandPanels = (panel)=>(e, isExpanded)=>{
        setExpanded(isExpanded ? panel : false);
    }
    useEffect(()=>{
        if(family.no_balanceds && family.no_balanceds.length !== 0 )setAreLoans(true)
        if(family.no_balanceds && family.no_balanceds.length === 0 )setAreLoans(false)
    }, [family]);
    const idFamily = family._id;
    const classes = useStyles();
    const handleGetPDF = async()=>{
        const res = await getPDFNoBalanceds(family._id)
        const file = new Blob(
            [res.data],
            { type : 'application/pdf'}
        );
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL)
    }
    const handleGenerateBalance = async()=>{
        try {
            const res = await onGenerateBalance(family._id);
            console.log(res)
            history.push('/board')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TabPanel
            value={valueTab}
            key={index}
            index={index}
            className={classes.root}
            >
            <Typography variant='h6' align='center'>
            Panel de prestamos en {family.name}
            </Typography>
            <Accordion expanded={ expanded === 'panelBalances'} onChange={handleExpandPanels('panelBalances')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography color='textPrimary' className={classes.summaryHeading}>Balances anteriores</Typography>
                        <Typography color='textSecondary'  className={classes.summarySecondaryHeading}>Estos balances no se consideran en los prestamos siguientes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CListBalances idFamily={idFamily} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={ expanded === 'panelLoans'} onChange={handleExpandPanels('panelLoans')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography color='textPrimary' className={classes.summaryHeading}>Prestamos actuales</Typography>
                        <Typography color='textSecondary' className={classes.summarySecondaryHeading}>Prestamos que aún no han sigo balanceados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <CListLoans idFamily={idFamily}/>
                </AccordionDetails>
                { areLoans && <>
                <Divider />
                <AccordionActions className={classes.actions}>
                    <Button size='small' color='primary' variant='outlined' onClick={handleGetPDF} target='_blank'>Generar PDF</Button>
                    <Button size='small' color='secondary' variant='contained' onClick={handleGenerateBalance}>Generar Balance</Button>
                </AccordionActions>
                </>}
            </Accordion>
            {!addLoan && <Button fullWidth variant='contained' color='primary' style={{ margin:'8px'}} onClick={()=>setAddLoan(true)}>Agregar prestamo</Button>}
            {addLoan && <CAddLoan setAddLoan={setAddLoan} family={family}/>}
        </TabPanel>
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
            id={`${xs ? 'vertical' : 'scrollable-auto'}-tabpanel-${index}`}
            aria-labelledby={`${xs ? 'vertical' : 'scrollable-auto'}-tab-${index}`}
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
export default TabPanelBoard
