import React, { useState} from 'react'
import { Autocomplete } from '@material-ui/lab';
import {Button, TextField, Typography, IconButton, Backdrop, CircularProgress } from '@material-ui/core'
import { AddBox as AddBoxIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack'
import dateFormat from 'dateformat';
import useStyle from './styles';
import NumberFormat from 'react-number-format'



function FormLoan({family, dataLoan, handleUpdateLoan, _id, setEdit, setDataLoan, dateLoan,  subject, quantity, spenders, beneficiaries, own_products, exclude_products}) {

    const classes = useStyle();
    const { enqueueSnackbar } = useSnackbar();
    const [loadingBack, setLoadingBack] = useState(false);
    const optionsMembers = family.members?.map(m => m.username);
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    const handleUpdate = async (e)=>{
        e.preventDefault();
        setLoadingBack(true)
        const setBeneficiariesSpenders = [...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])];
        var error=false;
        if(dataLoan.spenders.length===0 || dataLoan.spenders.some(s=>s.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe haber al menos un prestador')
        };
        if(dataLoan.beneficiaries.length===0 ){
            error=true;
            handleNotifyVariant('warning','Debe haber al menos un beneficiado')
        };
        if(dataLoan.own_products.some(o=>o.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario correcto en los productos propios')
        };
        if(dataLoan.own_products.some(o=>o.products.length===0)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar al menos un producto a un usuario en los productos propios')
        };
        if(dataLoan.own_products.some(o=>!setBeneficiariesSpenders.includes(o.username))){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario, en los productos propios, entre los beneficiados y prestadores')
        };
        if(dataLoan.exclude_products.some(ex=>ex.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario correcto en los productos excluidos')
        };
        if(dataLoan.exclude_products.some(ex=>ex.products.length===0)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar al menos un producto a un usuario en los productos excluidos')
        };
        if(dataLoan.exclude_products.some(ex=>!setBeneficiariesSpenders.includes(ex.username))){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario, en los productos excluidos, entre los beneficiados y prestadores')
        };
        if(error){setLoadingBack(false);return;}
        try {
            const message = await handleUpdateLoan(_id, family._id, dataLoan);
            handleNotifyVariant('success', message);
            setEdit(false);
        } catch (error) {
            if (error.status === 400) {
                handleNotifyVariant('warning', error.message);
            }
            if (error.status === 404) {
                handleNotifyVariant('error', error.message);
            }
        }
        finally{
            setLoadingBack(false)
        }
    }
    const handleCancel = ()=>{
        setDataLoan({ date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products })
        setEdit(false);
    }
    const handleChange = (e) => {
        setDataLoan({ ...dataLoan, [e.target.name]: e.target.value })
    }
    const handleChangeExpenseSpenders = (e, index) => {
        setDataLoan({ ...dataLoan, spenders: dataLoan.spenders.map((s, i) => i === index ? ({ ...s, [e.target.name]: Number(e.target.value) }) : s) })
    }
    const handleChangeOwnProducts = (e, index, indexP) => {
        setDataLoan({ ...dataLoan, own_products: dataLoan.own_products.map((o, i) => i === index ? ({ ...o, products: o.products.map((p, i) => i === indexP ? ({ ...p, [e.target.name]: (e.target.name==='price' || e.target.name==='discount')?Number(e.target.value):e.target.value }) : (p)) }) : o) })
    }
    const handleChangeExcludeProducts = (e, index, indexP) => {
        setDataLoan({ ...dataLoan, exclude_products: dataLoan.exclude_products.map((ex, i) => i === index ? ({ ...ex, products: ex.products.map((p, i) => i === indexP ? ({ ...p, [e.target.name]: (e.target.name==='price' || e.target.name==='discount')?Number(e.target.value):e.target.value }) : (p)) }) : ex) })
    }

    const handleAddSpender = () => {
        setDataLoan({ ...dataLoan, spenders: [...dataLoan.spenders, { username: optionsMembers.find(e => !dataLoan.spenders.some(s => s.username === e)), expense: 0 }] })
    }
    const handleAddOwnProduct = () => {
        const setBeneficiariesSpenders = [...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])];
        setDataLoan({ ...dataLoan, own_products: [...dataLoan.own_products, { username: setBeneficiariesSpenders.find(e => !dataLoan.own_products.some(s => s.username === e)), products: [{ name: '', price: 0, discount: 0 }] }] })
    }
    const handleAddProductOwn = (index) => {
        setDataLoan({ ...dataLoan, own_products: dataLoan.own_products.map((o, i) => i === index ? ({ ...o, products: [...o.products, { name: '', price: 0, discount: 0 }] }) : (o)) })
    }
    const handleAddExcludeProduct = () => {
        const setBeneficiariesSpenders = [...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])];
        setDataLoan({ ...dataLoan, exclude_products: [...dataLoan.exclude_products, { username: setBeneficiariesSpenders.find(e => !dataLoan.exclude_products.some(s => s.username === e)), products: [{ name: '', price: 0, discount: 0 }] }] })
    }
    const handleAddProductExclude = (index) => {
        setDataLoan({ ...dataLoan, exclude_products: dataLoan.exclude_products.map((o, i) => i === index ? ({ ...o, products: [...o.products, { name: '', price: 0, discount: 0 }] }) : (o)) })
    }
    const handleDeleteSpender = (indexSpender) => {
        setDataLoan({ ...dataLoan, spenders: dataLoan.spenders.filter((s, index) => index !== indexSpender) })
    }
    const handleDeleteProductOwn = (index, indexP) => {
        setDataLoan({ ...dataLoan, own_products: dataLoan.own_products.map((o, i) => i === index ? ({ ...o, products: o.products.filter((p, i) => i !== indexP) }) : (o)) })
    }
    const handleDeleteOwnProduct = (index) => {
        setDataLoan({ ...dataLoan, own_products: dataLoan.own_products.filter((o, i) => i !== index) })
    }
    const handleDeleteProductExclude = (index, indexP) => {
        setDataLoan({ ...dataLoan, exclude_products: dataLoan.exclude_products.map((o, i) => i === index ? ({ ...o, products: o.products.filter((p, i) => i !== indexP) }) : (o)) })
    }
    const handleDeleteExcludeProduct = (index) => {
        setDataLoan({ ...dataLoan, exclude_products: dataLoan.exclude_products.filter((o, i) => i !== index) })
    }
    return (
        <>
        <Backdrop open={loadingBack} className={classes.backdrop}>
                <CircularProgress color='inherit' />
            </Backdrop>
        <form onSubmit={handleUpdate}>
                    <Typography variant='body2'><b>Fecha:</b></Typography> <TextField required name='date' variant='standard' style={{ marginBottom: '16px' }} type='date' value={dataLoan.date} onChange={handleChange} />
                    <Typography variant='body2' ><b>Asunto:</b></Typography> <TextField name='subject' variant='standard' style={{ marginBottom: '16px' }} type='text' value={dataLoan.subject} onChange={handleChange} />
                    <Typography variant='body2' ><b>Gasto Total:</b></Typography><TextField required name='quantity' variant='standard' style={{ marginBottom: '16px' }} value={dataLoan.quantity} onChange={(e)=>setDataLoan({...dataLoan, 'quantity':Number(e.target.value)})} InputProps={{ inputComponent: NumberFormatCustom }} />
                    <Typography variant='body2' ><b>Prestadores:</b></Typography><div className={classes.containerSpendersEdit}>{
                        dataLoan.spenders.map((s, index) =>
                            <div className={classes.spendersEdit} key={index}>
                                <Autocomplete
                                    options={optionsMembers}
                                    value={s.username}
                                    style={{ width: '40%' }}
                                    getOptionDisabled={(option) => dataLoan.spenders.some(spender => spender.username === option)}
                                    onChange={(e, newValue) => {
                                        setDataLoan({ ...dataLoan, spenders: dataLoan.spenders.map((spender, indexS) => (indexS === index) ? ({ ...spender, username: newValue }) : (spender)) })
                                    }}
                                    renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                <TextField
                                    required
                                    name='expense'
                                    label='Prestamo'
                                    variant='standard'
                                    style={{ width: '40%' }}
                                    value={s.expense}
                                    onChange={(e) => handleChangeExpenseSpenders(e, index)}
                                    InputProps={{ inputComponent: NumberFormatCustom }} />
                                <IconButton onClick={() => handleDeleteSpender(index)} style={{ padding: 0 }}>
                                    <DeleteIcon style={{ fill: "#f44336" }} />
                                </IconButton>
                            </div>)}
                        {optionsMembers.length !== dataLoan.spenders.length && <IconButton style={{ borderRadius: 0, margin:'8px 0px' }} onClick={handleAddSpender}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
                    <Typography variant='body2' ><b>Beneficiarios:</b></Typography>
                    <div className={classes.containerBeneficiaries}>
                        <Autocomplete
                            multiple
                            options={optionsMembers}
                            value={[...dataLoan.beneficiaries]}
                            filterSelectedOptions
                            onChange={(e, newValue) => {
                                setDataLoan({ ...dataLoan, beneficiaries: newValue })
                            }}
                            renderInput={(params) => (<TextField {...params} />)} />
                    </div>
                    <Typography variant='body2' ><b>Productos propios:</b></Typography>
                    <div className={classes.containerSpendersEdit} >
                        {
                            dataLoan.own_products.map((o, index) =>
                                <div key={index} className={classes.containerProductMember} style={{ border: '1px solid #bdbdbd' }}>
                                    <div className={classes.containerMemberProducts}>
                                        <Autocomplete
                                            options={[...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])]}
                                            value={o.username}
                                            style={{ width: 150 }}
                                            getOptionDisabled={(option) => dataLoan.own_products.some(own_product => own_product.username === option)}
                                            onChange={(e, newValue) => {
                                                setDataLoan({ ...dataLoan, own_products: dataLoan.own_products.map((own_product, indexS) => (indexS === index) ? ({ ...own_product, username: newValue }) : (own_product)) })
                                            }}
                                            renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                        <IconButton onClick={(e) => handleDeleteOwnProduct(index)} style={{ top: '12px' }}>
                                            <DeleteIcon style={{ fill: "#f44336" }} />
                                        </IconButton>
                                    </div>
                                    {o.products.map((p, indexP) =>
                                        <div key={indexP} className={classes.containerProducts}>
                                            <TextField required name="name" label='nombre' value={p.name}  onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
                                            <TextField required name="price" label='precio' value={p.price} InputProps={{ inputComponent: NumberFormatCustom }} onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
                                            <TextField required name="discount" label='descuento' value={p.discount} InputProps={{ inputComponent: NumberFormatCustom }} onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
                                            <IconButton onClick={(e) => handleDeleteProductOwn(index, indexP)} style={{ top: '12px', padding: 0 }}>
                                                <DeleteIcon style={{ fill: "#f44336" }} />
                                            </IconButton>
                                        </div>
                                    )}
                                    <IconButton style={{ borderRadius: 0, width: '60%', margin: '8px auto' }} onClick={(e) => handleAddProductOwn(index)}>
                                        <AddBoxIcon style={{ fill: "#00a152" }} />
                                    </IconButton>
                                </div>
                            )
                        }
                        { [...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])].length !== dataLoan.own_products.length && <IconButton style={{ borderRadius: 0 }} onClick={handleAddOwnProduct}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
                    <Typography variant='body2' ><b>Productos excluidos:</b></Typography>
                    <div className={classes.containerSpendersEdit} >
                        {
                            dataLoan.exclude_products.map((o, index) =>
                                <div key={index} className={classes.containerProductMember} style={{ border: '1px solid #bdbdbd' }}>
                                    <div className={classes.containerMemberProducts}>
                                        <Autocomplete
                                            options={[...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])]}
                                            value={o.username}
                                            style={{ width: 150 }}
                                            getOptionDisabled={(option) => dataLoan.exclude_products.some(exclude_product => exclude_product.username === option)}
                                            onChange={(e, newValue) => {
                                                setDataLoan({ ...dataLoan, exclude_products: dataLoan.exclude_products.map((exclude_product, indexS) => (indexS === index) ? ({ ...exclude_product, username: newValue }) : (exclude_product)) })
                                            }}
                                            renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                        <IconButton onClick={(e) => handleDeleteExcludeProduct(index)} style={{ top: '12px' }}>
                                            <DeleteIcon style={{ fill: "#f44336" }} />
                                        </IconButton>
                                    </div>
                                    {o.products.map((p, indexP) =>
                                        <div key={indexP} className={classes.containerProducts}>
                                            <TextField required name="name" label='nombre' value={p.name}  onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
                                            <TextField required name="price"  label='precio' value={p.price} InputProps={{ inputComponent: NumberFormatCustom }}  onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
                                            <TextField required name="discount"  label='descuento' value={p.discount} InputProps={{ inputComponent: NumberFormatCustom }}  onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
                                            <IconButton onClick={(e) => handleDeleteProductExclude(index, indexP)} style={{ top: '12px', padding: 0 }}>
                                                <DeleteIcon style={{ fill: "#f44336" }} />
                                            </IconButton>
                                        </div>
                                    )}
                                    <IconButton style={{ borderRadius: 0, width: '60%', margin: '8px auto' }} onClick={(e) => handleAddProductExclude(index)}>
                                        <AddBoxIcon style={{ fill: "#00a152" }} />
                                    </IconButton>
                                </div>
                            )
                        }
                        {[...new Set([...dataLoan.beneficiaries, ...dataLoan.spenders.map( s=> s.username)])].length !== dataLoan.exclude_products.length && <IconButton style={{ borderRadius: 0 }} onClick={handleAddExcludeProduct}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
                    <div className={classes.containerButton}>
                    <Button size='small' variant="contained" color="primary" type='submit'>Actualizar</Button>
                    <Button size='small' variant="contained" color="secondary" onClick={handleCancel}>Cancelar</Button>
                    </div>
                </form>
                </>
    )
}
function NumberFormatCustom(props){
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="s/"
      />
    );
}
export default FormLoan
