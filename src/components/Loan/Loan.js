import { Divider, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useStyle from './styles';
import dateFormat from 'dateformat';
import { AddBox as AddBoxIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';


function Balance({ family, subject, creator, quantity, spenders, beneficiaries, own_products, exclude_products, sub_balance, images, date }) {
    const classes = useStyle();
    const dateLoan = new Date(date);
    dateLoan.setDate(dateLoan.getDate() + 1);
    const [edit, setEdit] = useState(false);
    const [dataLoan, setDataLoan] = useState({
        date: dateLoan, subject, quantity, spenders, beneficiaries, own_products, exclude_products
    })
    const optionsSpenders = family.members?.map(m => m.username);
    const handleEdit = () => {
        setEdit(!edit)
        if (edit) {
            setDataLoan({ date: dateLoan, subject, quantity, spenders, beneficiaries, own_products, exclude_products })
        }
    }
    const handleChange = (e) => {
        setDataLoan({ ...dataLoan, [e.target.name]: e.target.value })
    }
    const handleChangeExpenseSpenders = (e, username) => {
        setDataLoan({ ...dataLoan, spenders: dataLoan.spenders.map(s => s.username === username ? ({ ...s, [e.target.name]: e.target.value }) : s) })
    }
    const handleAddSpender = ()=>{
        setDataLoan({ ...dataLoan, spenders : [ ...dataLoan.spenders, { username : optionsSpenders.find( e=> !dataLoan.spenders.some( s => s.username === e)), expense : 0}]})
    }
    const handleDeleteSpender = (indexSpender)=>{
        setDataLoan({ ...dataLoan, spenders :  dataLoan.spenders.filter((s, index) => index!==indexSpender)})
    }
    useEffect(() => {
        console.log(dataLoan)
        console.log(optionsSpenders)
    })
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
                <Typography variant='body2' ><b>Productos propios:</b><br /></Typography>{(own_products.length === 0)?(<>&emsp;No hay productos</>):own_products.map((o) => (<div key={o.username}>&emsp;<b>{o.username}</b><ul style={{ margin: '7px 0px' }}>{o.products.map((p, index) => (<li key={index}>Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></div>))}
                <Typography variant='body2' ><b>Productos excluidos:</b><br /></Typography>{(exclude_products.length === 0 )?(<>&emsp;No hay productos</>):exclude_products.map((e) => (<div key={e.username}>&emsp;<b>{e.username}</b><ul style={{ margin: '7px 0px' }}>{e.products.map((p, index) => (<li key={index} >Nombre: {p.name}, Precio: s/{p.price}, Descuento: {p.discount}</li>))}</ul></div>))}
                <div className={classes.containerLoans}>
                    {sub_balance.map((b, index) => (<div className={classes.subBalance} key={index}><b>{b.username} : </b><b style={{ color: b.amount < 0 ? '#f44336' : '#3f51b5', }}>{((b.amount < 0) ? ('-s/') : ('s/')) + Math.abs(b.amount)}</b></div>))}
                </div>
            </>}
            {edit &&
                <>
                    <Typography variant='body2'><b>Fecha:</b></Typography> <TextField name='date' variant='standard' type='date' value={dateFormat(dataLoan.date, 'yyyy-mm-dd')} onChange={handleChange} />
                    <Typography variant='body2' ><b>Asunto:</b></Typography> <TextField name='subject' variant='standard' type='text' value={dataLoan.subject} onChange={handleChange} />
                    <Typography variant='body2' ><b>Gasto Total:</b></Typography><TextField name='quantity' variant='standard' type='number' value={dataLoan.quantity} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position='start'>s/</InputAdornment> }} />
                    <Typography variant='body2' ><b>Prestadores:</b></Typography><div className={classes.containerSpendersEdit}>{
                        dataLoan.spenders.map((s, index) =>
                            <div className={classes.spendersEdit} key={index}>
                                <Autocomplete
                                    options={optionsSpenders}
                                    value={s.username}
                                    style={{ width: 150 }}
                                    getOptionDisabled={(option) => dataLoan.spenders.some(spender => spender.username === option)}
                                    onChange={(e, newValue) => {
                                        setDataLoan({ ...dataLoan, spenders: dataLoan.spenders.map((spender, indexS) => (indexS === index) ? ({ ...spender, username: newValue }) : (spender)) })
                                    }}
                                    renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                <TextField
                                    name='expense'
                                    variant='standard'
                                    type='number'
                                    value={s.expense}
                                    onChange={(e) => handleChangeExpenseSpenders(e, s.username)} />
                                <IconButton onClick={()=>handleDeleteSpender(index)}>
                                    <DeleteIcon style={{ fill: "#f44336" }} />
                                </IconButton>
                            </div>)}
                            { optionsSpenders.length !== dataLoan.spenders.length &&<IconButton style={{ borderRadius:0}} onClick={handleAddSpender}>
                                <AddBoxIcon style={{fill : "#3f51b5"}}/>
                            </IconButton>}
                    </div>
                    <Typography variant='body2' ><b>Beneficiarios:</b></Typography> 
                        <Autocomplete
                            multiple
                            options={optionsSpenders}
                            value={[...dataLoan.beneficiaries]}
                            style={{ width: 300 }}
                            filterSelectedOptions
                            onChange={(e, newValue) => {
                                setDataLoan({ ...dataLoan, beneficiaries: newValue })
                            }}
                            renderInput={(params) => (<TextField label="Beneficiarios" {...params} />)} />
                    <Typography variant='body2' ><b>Productos propios:</b></Typography><br />
                    <Typography variant='body2' ><b>Productos excluidos:</b></Typography><br />
                    <div className={classes.containerLoans}>
                        {sub_balance.map((b, index) => (<div className={classes.subBalance} key={index}><b>{b.username} : </b><b style={{ color: b.amount < 0 ? '#f44336' : '#3f51b5', }}>{((b.amount < 0) ? ('-s/') : ('s/')) + Math.abs(b.amount)}</b></div>))}
                    </div>
                </>}
        </div>
    )
}

export default Balance
