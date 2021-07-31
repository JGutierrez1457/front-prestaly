import { Divider, IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './styles';
import dateFormat from 'dateformat';
import { Edit as EditIcon } from '@material-ui/icons';
import FormLoan from '../FormLoan/FormLoan';



function Balance({ family, _id, subject, creator, quantity, spenders, beneficiaries, own_products, exclude_products, sub_balance, images, date, handleUpdateLoan }) {
    const classes = useStyle();
    const dateLoan = new Date(date);
    dateLoan.setDate(dateLoan.getDate() + 1);
    const [edit, setEdit] = useState(false);
    const [dataLoan, setDataLoan] = useState({
        date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products
    })
    
    const handleEdit = () => {
        setEdit(!edit)
        if (edit) {
            setDataLoan({ date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products })
        }
    }
    
    
    return (
        <div>
            <Divider className={classes.divider} />
            <div className={classes.title}>
                <Typography variant='body2' style={{ fontStyle: 'italic', marginTop: '4px' }} align='center' color='textSecondary'>Creado por {creator}</Typography>
                <IconButton onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
            </div>
            {!edit && <>
                <Typography variant='body2'><b>Fecha:</b> {dateFormat(dateLoan, 'dd/mm/yyyy')}</Typography>
                <Typography variant='body2' ><b>Asunto:</b> {subject}</Typography>
                <Typography variant='body2' ><b>Gasto Total:</b> s/{quantity}</Typography>
                <Typography variant='body2' ><b>Prestadores:</b> {spenders.map(s => `${s.username} (s/${s.expense})`).toString()}</Typography>
                <Typography variant='body2' ><b>Beneficiarios:</b> {beneficiaries.toString()}</Typography>
                <Typography variant='body2' ><b>Productos propios:</b><br /></Typography>{(own_products.length === 0) ? (<>&emsp;No hay productos</>) : own_products.map((o) => (<div key={o.username}>&emsp;<b>{o.username}</b><ul style={{ margin: '7px 0px' }}>{o.products.map((p, index) => (<li key={index}>Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></div>))}
                <Typography variant='body2' ><b>Productos excluidos:</b><br /></Typography>{(exclude_products.length === 0) ? (<>&emsp;No hay productos</>) : exclude_products.map((e) => (<div key={e.username}>&emsp;<b>{e.username}</b><ul style={{ margin: '7px 0px' }}>{e.products.map((p, index) => (<li key={index} >Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></div>))}
                <div className={classes.containerLoans}>
                    {sub_balance.map((b, index) => (<div className={classes.subBalance} key={index}><b>{b.username} : </b><b style={{ color: b.amount < 0 ? '#f44336' : '#3f51b5', }}>{((b.amount < 0) ? ('-s/') : ('s/')) + Math.abs(b.amount)}</b></div>))}
                </div>
            </>}
            {edit &&
                <FormLoan family={family} dateLoan={dateLoan} dataLoan={dataLoan} handleUpdateLoan={handleUpdateLoan} _id={_id} setEdit={setEdit} setDataLoan={setDataLoan}  subject quantity spenders beneficiaries own_products exclude_products/>}
        </div>
    )
}

export default Balance
