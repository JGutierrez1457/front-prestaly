import { Divider, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';
import dateFormat from 'dateformat';

function Balance({subject, creator, quantity, spenders, beneficiaries, own_products, exclude_products, sub_balance, images, date}) {
    const classes = useStyle();
    return (
        <>
        <Divider className={classes.divider} />
        <Typography variant='body2' style={{fontStyle: 'italic', marginTop:'4px'}} align='center' color='textSecondary'>Creado por {creator}</Typography>
        <Typography variant='body2'><b>Fecha:</b> {dateFormat(date, 'dd/mm/yyyy')}</Typography>
        <Typography variant='body2' ><b>Asunto:</b> {subject}</Typography>
        <Typography variant='body2' ><b>Gasto Total:</b> s/{quantity}</Typography>
        <Typography variant='body2' ><b>Prestadores:</b> {spenders.map( s=>`${s.username} (s/${s.expense})`).toString()}</Typography>
        <Typography variant='body2' ><b>Beneficiarios:</b> {beneficiaries.toString()}</Typography>
        <Typography variant='body2' ><b>Productos propios:</b><br/> {own_products.map(o=>(<>&emsp;<b>{o.username}</b><ul style={{margin : '7px 0px'}}>{o.products.map(p=>(<li>Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></>) )}</Typography>
        <Typography variant='body2' ><b>Productos excluidos:</b><br/> {exclude_products.map(e=>(<>&emsp;<b>{e.username}</b><ul style={{margin : '7px 0px'}}>{e.products.map(p=>(<li>Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></>) )}</Typography>
        <div className={classes.containerLoans}>
        {sub_balance.map( (b, index)=>(<div key={index} className={classes.subBalance}><b>{b.username} : </b><b style={{ color : b.amount<0?'#f44336':'#3f51b5', }}>{((b.amount<0)?('-s/'):('s/'))+Math.abs(b.amount)}</b></div>))}
        </div>
        </>
    )
}

export default Balance
