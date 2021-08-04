import { Paper, Typography, Button, TextField, IconButton, Backdrop, CircularProgress } from '@material-ui/core'
import { Delete as DeleteIcon, AddBox as AddBoxIcon } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { useState } from 'react'
import useStyles from './styles'
import dateFormat from 'dateformat';
import { useSnackbar } from 'notistack'
import NumberFormat from 'react-number-format'

function AddLoan({setAddLoan, handleCreateLoan, members, idfamily}) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loadingBack, setLoadingBack] = useState(false);


    const [ loan, setLoan] = useState(
        {
            date: dateFormat(new Date(), "yyyy-mm-dd"),
            subject : '',
            quantity:'',
            spenders : [],
            beneficiaries : [],
            own_products : [],
            exclude_products : []
        }
    )
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    const handleAddLoan = async (e)=>{
        e.preventDefault();
        setLoadingBack(true)
        const setBeneficiariesSpenders = [...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])];
        var error=false;
        if(loan.spenders.length===0 || loan.spenders.some(s=>s.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe haber al menos un prestador')
        };
        if(loan.beneficiaries.length===0 ){
            error=true;
            handleNotifyVariant('warning','Debe haber al menos un beneficiado')
        };
        if(loan.own_products.some(o=>o.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario correcto en los productos propios')
        };
        if(loan.own_products.some(o=>o.products.length===0)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar al menos un producto a un usuario en los productos propios')
        };
        if(loan.own_products.some(o=>!setBeneficiariesSpenders.includes(o.username))){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario, en los productos propios, entre los beneficiados y prestadores')
        };
        if(loan.exclude_products.some(ex=>ex.username===null)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario correcto en los productos excluidos')
        };
        if(loan.exclude_products.some(ex=>ex.products.length===0)){
            error=true;
            handleNotifyVariant('warning','Debe ingresar al menos un producto a un usuario en los productos excluidos')
        };
        if(loan.exclude_products.some(ex=>!setBeneficiariesSpenders.includes(ex.username))){
            error=true;
            handleNotifyVariant('warning','Debe ingresar un usuario, en los productos excluidos, entre los beneficiados y prestadores')
        };
        if(error){setLoadingBack(false);return;}
        
        try {
            const message = await handleCreateLoan(idfamily, loan)
            handleNotifyVariant('success', message);
            setLoadingBack(false)
            setAddLoan(false);
        } catch (error) {
            if (error.status === 400) {
                setLoadingBack(false) 
                handleNotifyVariant('warning', error.message);
            }
            if (error.status === 404) {
                setLoadingBack(false)
                handleNotifyVariant('error', error.message);
            }
        }
    }
    const handleChange = (e) => {
        setLoan({ ...loan, [e.target.name]: e.target.value })
    }
    const handleChangeExpenseSpenders = (e, index) => {
        setLoan({ ...loan, spenders: loan.spenders.map((s, i) => i === index ? ({ ...s, [e.target.name]: Number(e.target.value) }) : s) })
    }
    const handleChangeOwnProducts = (e, index, indexP) => {
        setLoan({ ...loan, own_products: loan.own_products.map((o, i) => i === index ? ({ ...o, products: o.products.map((p, i) => i === indexP ? ({ ...p, [e.target.name]: (e.target.name==='price' || e.target.name==='discount')?Number(e.target.value):e.target.value }) : (p)) }) : o) })
    }
    const handleChangeExcludeProducts = (e, index, indexP) => {
        setLoan({ ...loan, exclude_products: loan.exclude_products.map((ex, i) => i === index ? ({ ...ex, products: ex.products.map((p, i) => i === indexP ? ({ ...p, [e.target.name]: (e.target.name==='price' || e.target.name==='discount')?Number(e.target.value):e.target.value }) : (p)) }) : ex) })
    }

    const handleAddSpender = () => {
        setLoan({ ...loan, spenders: [...loan.spenders, { username: members.find(e => !loan.spenders.some(s => s.username === e)), expense: '' }] })
    }
    const handleAddOwnProduct = () => {
        const setBeneficiariesSpenders = [...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])];
        setLoan({ ...loan, own_products: [...loan.own_products, { username: setBeneficiariesSpenders.find(e => !loan.own_products.some(s => s.username === e)), products: [{ name: '', price: '', discount: '' }] }] })
    }
    const handleAddProductOwn = (index) => {
        setLoan({ ...loan, own_products: loan.own_products.map((o, i) => i === index ? ({ ...o, products: [...o.products, { name: '', price: '', discount: '' }] }) : (o)) })
    }
    const handleAddExcludeProduct = () => {
        const setBeneficiariesSpenders = [...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])];
        setLoan({ ...loan, exclude_products: [...loan.exclude_products, { username: setBeneficiariesSpenders.find(e => !loan.exclude_products.some(s => s.username === e)), products: [{ name: '', price: '', discount: '' }] }] })
    }
    const handleAddProductExclude = (index) => {
        setLoan({ ...loan, exclude_products: loan.exclude_products.map((o, i) => i === index ? ({ ...o, products: [...o.products, { name: '', price: '', discount: '' }] }) : (o)) })
    }
    const handleDeleteSpender = (indexSpender) => {
        setLoan({ ...loan, spenders: loan.spenders.filter((s, index) => index !== indexSpender) })
    }
    const handleDeleteProductOwn = (index, indexP) => {
        setLoan({ ...loan, own_products: loan.own_products.map((o, i) => i === index ? ({ ...o, products: o.products.filter((p, i) => i !== indexP) }) : (o)) })
    }
    const handleDeleteOwnProduct = (index) => {
        setLoan({ ...loan, own_products: loan.own_products.filter((o, i) => i !== index) })
    }
    const handleDeleteProductExclude = (index, indexP) => {
        setLoan({ ...loan, exclude_products: loan.exclude_products.map((o, i) => i === index ? ({ ...o, products: o.products.filter((p, i) => i !== indexP) }) : (o)) })
    }
    const handleDeleteExcludeProduct = (index) => {
        setLoan({ ...loan, exclude_products: loan.exclude_products.filter((o, i) => i !== index) })
    }
    return (
        <>
        <Backdrop open={loadingBack} className={classes.backdrop}>
                <CircularProgress color='inherit' />
            </Backdrop>
        <Paper className={classes.paper}>
            <Typography variant='h6' align='center'>Agregando Prestamo</Typography>
            <form onSubmit={handleAddLoan}>
                    <Typography variant='body2'><b>Fecha:</b></Typography> <TextField required name='date' variant='standard' style={{ marginBottom: '16px' }} type='date' value={loan.date} onChange={handleChange} />
                    <Typography variant='body2' ><b>Asunto:</b></Typography> <TextField name='subject' label="Ej. Makro" variant='standard' style={{ marginBottom: '16px' }} type='text' value={loan.subject} onChange={handleChange} />
                    <Typography variant='body2' ><b>Gasto Total:</b></Typography><TextField required name='quantity' label="Ej. 300.5" variant='standard' style={{ marginBottom: '16px' }} value={loan.quantity} onChange={(e)=>setLoan({...loan, 'quantity':Number(e.target.value)})} InputProps={{ inputComponent: NumberFormatCustom }} />
                    <Typography variant='body2' ><b>Prestadores:</b></Typography><div className={classes.containerSpendersEdit}>{
                        loan.spenders.map((s, index) =>
                            <div className={classes.spendersEdit} key={index}>
                                <Autocomplete
                                    options={members}
                                    value={s.username}
                                    style={{ width: '40%' }}
                                    getOptionDisabled={(option) => loan.spenders.some(spender => spender.username === option)}
                                    onChange={(e, newValue) => {
                                        setLoan({ ...loan, spenders: loan.spenders.map((spender, indexS) => (indexS === index) ? ({ ...spender, username: newValue }) : (spender)) })
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
                                    InputProps={{ inputComponent : NumberFormatCustom }}/>
                                <IconButton onClick={() => handleDeleteSpender(index)} style={{ padding: 0 }}>
                                    <DeleteIcon style={{ fill: "#f44336" }} />
                                </IconButton>
                            </div>)}
                        {members.length !== loan.spenders.length && <IconButton style={{ borderRadius: 0, margin:'8px 0px' }} onClick={handleAddSpender}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
                    <Typography variant='body2' ><b>Beneficiarios:</b></Typography>
                    <div className={classes.containerBeneficiaries}>
                        <Autocomplete
                            multiple
                            options={members}
                            value={[...loan.beneficiaries]}
                            filterSelectedOptions
                            onChange={(e, newValue) => {
                                setLoan({ ...loan, beneficiaries: newValue })
                            }}
                            renderInput={(params) => (<TextField {...params} />)} />
                    </div>
                    <Typography variant='body2' ><b>Productos propios:</b></Typography>
                    <div className={classes.containerSpendersEdit} >
                        {
                            loan.own_products.map((o, index) =>
                                <div key={index} className={classes.containerProductMember} style={{ border: '1px solid #bdbdbd' }}>
                                    <div className={classes.containerMemberProducts}>
                                        <Autocomplete
                                            options={[...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])]}
                                            value={o.username}
                                            style={{ width: 150 }}
                                            getOptionDisabled={(option) => loan.own_products.some(own_product => own_product.username === option)}
                                            onChange={(e, newValue) => {
                                                setLoan({ ...loan, own_products: loan.own_products.map((own_product, indexS) => (indexS === index) ? ({ ...own_product, username: newValue }) : (own_product)) })
                                            }}
                                            renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                        <IconButton onClick={(e) => handleDeleteOwnProduct(index)} style={{ top: '12px' }}>
                                            <DeleteIcon style={{ fill: "#f44336" }} />
                                        </IconButton>
                                    </div>
                                    {o.products.map((p, indexP) =>
                                        <div key={indexP} className={classes.containerProducts}>
                                            <TextField required name="name" label='nombre' value={p.name}  onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
                                            <TextField required name="price" label='precio' value={p.price}  InputProps={{ inputComponent : NumberFormatCustom }} onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
                                            <TextField required name="discount" label='descuento' value={p.discount}  InputProps={{ inputComponent : NumberFormatCustom }} onChange={(e) => handleChangeOwnProducts(e, index, indexP)} />
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
                        { [...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])].length !== loan.own_products.length && <IconButton style={{ borderRadius: 0 }} onClick={handleAddOwnProduct}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
                    <Typography variant='body2' ><b>Productos excluidos:</b></Typography>
                    <div className={classes.containerSpendersEdit} >
                        {
                            loan.exclude_products.map((o, index) =>
                                <div key={index} className={classes.containerProductMember} style={{ border: '1px solid #bdbdbd' }}>
                                    <div className={classes.containerMemberProducts}>
                                        <Autocomplete
                                            options={[...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])]}
                                            value={o.username}
                                            style={{ width: 150 }}
                                            getOptionDisabled={(option) => loan.exclude_products.some(exclude_product => exclude_product.username === option)}
                                            onChange={(e, newValue) => {
                                                setLoan({ ...loan, exclude_products: loan.exclude_products.map((exclude_product, indexS) => (indexS === index) ? ({ ...exclude_product, username: newValue }) : (exclude_product)) })
                                            }}
                                            renderInput={(params) => (<TextField label="Miembro" {...params} />)} />
                                        <IconButton onClick={(e) => handleDeleteExcludeProduct(index)} style={{ top: '12px' }}>
                                            <DeleteIcon style={{ fill: "#f44336" }} />
                                        </IconButton>
                                    </div>
                                    {o.products.map((p, indexP) =>
                                        <div key={indexP} className={classes.containerProducts}>
                                            <TextField required name="name" label='nombre' value={p.name}  onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
                                            <TextField required name="price" label='precio' value={p.price}  InputProps={{ inputComponent : NumberFormatCustom }} onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
                                            <TextField required name="discount" label='descuento' value={p.discount}  InputProps={{ inputComponent : NumberFormatCustom }} onChange={(e) => handleChangeExcludeProducts(e, index, indexP)} />
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
                        {[...new Set([...loan.beneficiaries, ...loan.spenders.map( s=> s.username)])].length !== loan.exclude_products.length && <IconButton style={{ borderRadius: 0 }} onClick={handleAddExcludeProduct}>
                            <AddBoxIcon style={{ fill: "#3f51b5" }} />
                        </IconButton>}
                    </div>
            <div className={classes.buttons}>
                <Button color='primary' variant='contained' size='small' type='submit'>Agregar</Button>
                <Button color='secondary' variant='contained' size='small' onClick={()=>setAddLoan(false)}>Cancelar</Button>
            </div>
                </form>
        </Paper>
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

export default AddLoan
