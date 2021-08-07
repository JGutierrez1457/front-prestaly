import React,{ useEffect} from 'react'
import axios from 'axios'
import Balance from '../Balance/Balance';
import { CircularProgress } from '@material-ui/core';
import useStyle  from './styles'

function ListBalances({handleGetBalancesFamily, idFamily, family }) {
    const classes = useStyle();
    useEffect(() => {
        let cancel;
        const getBalances = async ()=>{
            try {
                await handleGetBalancesFamily(new axios.CancelToken( c => cancel = c),idFamily )
            } catch (error) {
                if(axios.isCancel(error))return;
            }
        }
        getBalances();
        return ()=>cancel();
    }, [handleGetBalancesFamily, idFamily]);
    if(family.balances && family.balances.length !== 0 ){return <div className={classes.containerBalances}>{family.balances.map( (balance, index) =><Balance key={index} {...balance}  /> )}</div>}
    if(family.balances && family.balances.length === 0 ){return <p> Ningún Balance</p>}
    if(!family.balances){return <CircularProgress />}

}

export default ListBalances
