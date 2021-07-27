import { Divider, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';

function Balance({subject, creator, quantity, spenders, beneficiaries, own_products, exclude_products, sub_balance, images, date}) {
    const classes = useStyle();
    return (
        <>
        <Divider />
        <Typography variant='body2' style={{fontStyle: 'italic'}} align='center' color='textSecondary'>Creado por {creator} el {date}</Typography>
        <Typography variant='body2' >Asunto: {subject}</Typography>
        <Typography variant='body2' >Gasto Total: {quantity}</Typography>
        <Typography variant='body2' >Prestadores: {spenders.map( s=>`${s.username} (${s.expense})`).toString()}</Typography>
        <Typography variant='body2' >Beneficiarios: {beneficiaries.toString()}</Typography>
        <div className={classes.containerLoans}>
        {sub_balance.map( (b, index)=>(<div key={index}><b>{b.username} : </b><span>{b.amount}</span></div>))}
        </div>
        </>
    )
}

export default Balance
