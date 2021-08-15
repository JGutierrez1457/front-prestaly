import React, { useEffect } from 'react'
import axios from 'axios'
import Loan from '../Loan/Loan'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@material-ui/core';
import useStyle from './styles'
import { useState } from 'react';
import dateFormat from 'dateformat';

function ListLoans({ handleGetNoBalancedsFamily, handleUpdateLoan, handleUploadImage, handleDeleteImage, idFamily, family }) {
    const classes = useStyle();
    const [ expandedLoan , setExpandedLoan ]= useState(false);
    const handleExpanded = (loan)=>(e, newExpanded)=>{
        setExpandedLoan(newExpanded ? loan : false);
    }
    useEffect(() => {
        let cancel;
        const getLoans = async () => {
            try {
                await handleGetNoBalancedsFamily(new axios.CancelToken(c => cancel = c), idFamily)
            } catch (error) {
                if (axios.isCancel(error)) return;
            }
        }
        getLoans();
        return () => cancel();
    }, [handleGetNoBalancedsFamily, idFamily]);
    if (family.no_balanceds && family.no_balanceds.length !== 0) {
        return <div className={classes.containerLoans}>
            {family.no_balanceds.map(
                (loan, index) => {
                const dateLoan = new Date(loan.date);
                dateLoan.setDate(dateLoan.getDate() +1);
                return <Accordion key={index} square expanded={expandedLoan === loan._id} onChange={handleExpanded(loan._id)} TransitionProps={{ unmountOnExit : true}} >
                    <AccordionSummary style={{ background : 'rgba(0, 0, 0, .03', borderBottom: '1px solid rgba(0, 0, 0, .125)'}}>
                        <b>{dateFormat(dateLoan, "dd/mm/yyyy")}</b>&nbsp;<span style={{marginLeft : '16px'}}>{loan.subject}</span>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'block'}}>
                        <Loan key={index} {...loan} family={family} handleUpdateLoan={handleUpdateLoan} handleUploadImage={handleUploadImage} handleDeleteImage={handleDeleteImage} />
                    </AccordionDetails>

                </Accordion>}
            )}
        </div>
    }
    if (family.no_balanceds && family.no_balanceds.length === 0) { return <p> Ningún Prestamo</p> }
    if (!family.no_balanceds) { return <CircularProgress /> }
}

export default ListLoans
