import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import CListBalances from '../../containers/Balances/CListBalances';
import CListLoans from '../../containers/Loans/CListLoans';
import Drawer from '../Drawer/Drawer'
import useStyles from './styles'

function Board() {
    const [ expanded, setExpanded ] = useState(false);
    const handleExpandPanels = (panel)=>(e, isExpanded)=>{
        setExpanded(isExpanded ? panel : false);
    }
    const classes = useStyles();
    return (
        <Drawer>
            <Typography variant='h6' align='center'>
            Panel de prestamos
            </Typography>
            <Accordion expanded={ expanded === 'panelBalances'} onChange={handleExpandPanels('panelBalances')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography color='textPrimary' className={classes.summaryHeading}>Balances anteriores</Typography>
                        <Typography color='textSecondary'  className={classes.summarySecondaryHeading}>Estos balances no se consideran en los prestamos siguientes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CListBalances />
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
                <CListLoans />
                </AccordionDetails>
            </Accordion>
        </Drawer>
    )
}

export default Board
