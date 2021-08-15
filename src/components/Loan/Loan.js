import { Button, IconButton, MobileStepper, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './styles';
import dateFormat from 'dateformat';
import { AddPhotoAlternate, Edit as EditIcon, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import FormLoan from '../FormLoan/FormLoan';
import Upload from '../Upload/Upload';
import CListImages from '../../containers/Images/CListImages';
import { v4 as uuidv4 } from 'uuid'
import fileSize from 'filesize';

function Balance({ family, _id, subject, creator, quantity, spenders, beneficiaries, own_products, exclude_products, sub_balance, images, date, handleUpdateLoan, handleUploadImage, handleDeleteImage }) {
    const classes = useStyle();
    const dateLoan = new Date(date);
    dateLoan.setDate(dateLoan.getDate() + 1);
    const [edit, setEdit] = useState(false);
    const [dataLoan, setDataLoan] = useState({
        date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products
    })
    const [activeStepImages, setActiveStepImages] = useState(0);
    const [activeStepEditLoan, setActiveStepEditLoan] = useState(0);
    const [filesUploaded, setFilesUploaded] = useState(
        images.map(f => ({
            id: f._id,
            name: f.name,
            readableSize: fileSize(f.size),
            preview: f.url,
            uploaded: true,
            error: false,
            url: f.url
        }))
    );
    /*     useEffect(()=>{
            setFilesUploaded( images.map(f =>({
                id : f._id,
                name : f.name,
                readableSize : fileSize(f.size),
                preview : f.url,
                uploaded : true,
                error : false,
                url : f.url
            })))
        },[images]) */
    const resetFileUploaded = () => {
        setFilesUploaded(images.map(f => ({
            id: f._id,
            name: f.name,
            readableSize: fileSize(f.size),
            preview: f.url,
            uploaded: true,
            error: false,
            url: f.url
        })))
    }
    const handleEdit = () => {
        if (edit) {
            if(activeStepEditLoan === 0){
                setEdit(false);
            }else{
                setActiveStepEditLoan(0);
            }
            resetFileUploaded();
            setDataLoan({ date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products })
        }else{
            setEdit(true);
            setActiveStepEditLoan(0)
        }
    }
    const handleAddImages = () => {
        if (edit) {
            if(activeStepEditLoan === 1){
                setEdit(false)
            }else{
                setActiveStepEditLoan(1)
            }
            resetFileUploaded();
            setDataLoan({ date: dateFormat(dateLoan, "yyyy-mm-dd"), subject, quantity, spenders, beneficiaries, own_products, exclude_products })
        } else{
            setEdit(true)
            setActiveStepEditLoan(1);
        }
    }
    const handleNextImage = () => {
        setActiveStepImages((prevState) => prevState + 1)
    }
    const handleBackImage = () => {
        setActiveStepImages((prevState) => prevState - 1)
    }

    const uploadImage = async (files) => {
        var uploadFiles = [];
        for (let f of files) {
            var file = f;
            /*
            if(file.type === 'image/jpeg' || f.type === 'image/jpg'){
                 const dataArrayBuffer = await new Promise( resolve =>{
                    const reader = new FileReader();
                    reader.onload = ()=> resolve(reader.result);
                    reader.readAsArrayBuffer(f)
                })
                const buf = Buffer.from(dataArrayBuffer);
                const { height, width, data} = jpeg.decode(buf);
                const { buffer } = await jo.rotate(buf, { quality : 50});            
                var rawImageData = {
                    data: buffer,
                    width: width,
                    height: height,
                  };
                  var jpegImageData = jpeg.encode(rawImageData, 50);
                  console.log(jpegImageData.data)
                  file = new File(jpegImageData.data,f.name, { type : f.type}) 

            }*/
            uploadFiles = [...uploadFiles,
            {
                file: file,
                id: uuidv4(),
                name: f.name,
                readableSize: fileSize(f.size),
                preview: URL.createObjectURL(file),
                progress: 0,
                uploaded: false,
                error: false,
                url: null
            }]
        }

        setFilesUploaded([...filesUploaded, ...uploadFiles])

        for (let uploadedFile of uploadFiles) {
            const data = new FormData();
            data.append('file', uploadedFile.file, uploadedFile.name);
            handleUploadImage(_id, family._id, data, e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));
                updateFile(uploadedFile.id, { progress })
            }).then(res => {
                updateFile(uploadedFile.id, {
                    id: res.idimage,
                    uploaded: true,
                    url: res.url
                })

            }).catch(() => {
                updateFile(uploadedFile.id, { error: true })
            })


        }

    }
    const updateFile = (id, data) => {
        let files;
        setFilesUploaded(state => {
            files = state;
            return state
        })
        setFilesUploaded(files.map(fu => {
            return fu.id === id ? { ...fu, ...data } : fu
        }))
    }
    const handleDelete = async (idloan, idfamily, idimage) => {
        setFilesUploaded(filesUploaded.filter(file => file.id !== idimage))
        await handleDeleteImage(idloan, idfamily, idimage);
    };
    return (
        <div>
            <div className={classes.title}>
                <Typography variant='body2' style={{ fontStyle: 'italic', marginTop: '4px' }} align='center' color='textSecondary'>Creado por {creator}</Typography>
                <div className={classes.buttonsEdit}>
                <IconButton onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleAddImages}>
                    <AddPhotoAlternate />
                </IconButton>
                </div>
            </div>
            {!edit &&
                <div className={classes.loanContainer}>
                    <div style={{ width: 'auto' }}>
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
                    </div>
                    {!!images.length && <div className={classes.containerImages}>
                        <div className={classes.containerImage}>
                            <a href={images[activeStepImages].url} target="_blank" rel="noreferrer" style={{width:'100%'}}>
                                <img src={images[activeStepImages].url} alt={images[activeStepImages].name} className={classes.image} />
                            </a>
                        </div>
                        <MobileStepper
                            steps={images.length}
                            position='static'
                            variant='text'
                            activeStep={activeStepImages}
                            nextButton={
                                <Button size='small' onClick={handleNextImage} disabled={activeStepImages === images.length - 1}>
                                    Siguiente
                                    <KeyboardArrowRight />
                                </Button>
                            }
                            backButton={
                                <Button size='small' onClick={handleBackImage} disabled={activeStepImages === 0}>
                                    <KeyboardArrowLeft />
                                    Anterior
                                </Button>
                            }
                        >

                        </MobileStepper>
                    </div>}
                </div>}
            {edit &&
                <Stepper orientation='vertical' activeStep={activeStepEditLoan} className={classes.stepper}>
                    <Step key='edit loan' >
                        <StepLabel>Editar prestamo</StepLabel>
                        <StepContent className={classes.stepperContent}>
                            <FormLoan family={family} setActiveStepEditLoan={setActiveStepEditLoan} dateLoan={dateLoan} dataLoan={dataLoan} handleUpdateLoan={handleUpdateLoan} _id={_id} setDataLoan={setDataLoan} subject quantity spenders beneficiaries own_products exclude_products />
                        </StepContent>
                    </Step>
                    <Step key='edit loan images'>
                        <StepLabel>Actualizar imagenes</StepLabel>
                        <StepContent className={classes.stepperContent}>
                            <Upload handleUploadImage={uploadImage} />
                            {!!filesUploaded.length && <CListImages files={filesUploaded} idloan={_id} idfamily={family._id} handleDelete={handleDelete} />}
                            <div className={classes.actions}>
                                <Button variant='contained' size='small' color={!!images.length ? 'primary' : 'default'} onClick={() => { setEdit(false); setActiveStepEditLoan(0); resetFileUploaded(); }}>{!!images.length ? 'Finalizar' : 'Omitir'}</Button>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            }
        </div>
    )
}

export default Balance
