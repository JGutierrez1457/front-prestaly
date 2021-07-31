import React,{ useEffect} from 'react'
import axios from 'axios'
import Loan from '../../Loan/Loan'
import { CircularProgress } from '@material-ui/core';
import useStyle  from './styles'

function ListLoans({ handleGetNoBalancedsFamily, handleUpdateLoan, idFamily, family}) {
    const classes = useStyle();
    useEffect(() => {
        let cancel;
        const getLoans = async ()=>{
            try {
                await handleGetNoBalancedsFamily(new axios.CancelToken( c => cancel = c),idFamily )
            } catch (error) {
                if(axios.isCancel(error))return;
            }
        }
        getLoans();
        return ()=>cancel();
    }, [handleGetNoBalancedsFamily, idFamily]);
    if(family.no_balanceds && family.no_balanceds.length !== 0 ){return <div className={classes.containerLoans}>{family.no_balanceds.map( (loan, index) =><Loan key={index} {...loan} family={family} handleUpdateLoan={handleUpdateLoan} /> )}</div>}
    if(family.no_balanceds && family.no_balanceds.length === 0 ){return <p> Ningún Prestamo</p>}
    if(!family.no_balanceds){return <CircularProgress />}
}

export default ListLoans
