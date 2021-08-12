import {
    Typography, Accordion, AccordionSummary, AccordionDetails,
    useTheme, useMediaQuery, Button, AccordionActions, Divider, Stepper, Step, StepLabel, StepContent
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CListBalances from '../../../containers/Balances/CListBalances';
import CAddLoan from '../../../containers/Loans/CAddLoan';
import CListLoans from '../../../containers/Loans/CListLoans';
import Upload from '../../Upload/Upload';
import CListImages from '../../../containers/Images/CListImages';
import useStyles from './styles'
import fileSize from 'filesize';
import { v4 as uuidv4 } from 'uuid'
import { deleteImageLoan, postImageLoan } from '../../../actions/families'
import { useDispatch } from 'react-redux'

function TabPanelBoard({ families, family, index, valueTab, getPDFNoBalanceds, onGenerateBalance }) {
    const [expanded, setExpanded] = useState(false);
    const [areLoans, setAreLoans] = useState(false);
    const [areMembers, setAreMembers] = useState(false);
    const [addLoan, setAddLoan] = useState({id : null, bool :false});
    const [filesUploaded, setFilesUploaded ] = useState([]);
    const [activeStepAddLoan, setActiveStepAddLoan] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleExpandPanels = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    useEffect(() => {
        if (family.no_balanceds && family.no_balanceds.length !== 0) setAreLoans(true)
        if (family.no_balanceds && family.no_balanceds.length === 0) setAreLoans(false)
        if (family.members && family.members.length !== 0) setAreMembers(true)
        if (family.members && family.members.length === 0) setAreMembers(false)
    }, [family]);
    const idFamily = family._id;
    const classes = useStyles();
    const handleGetPDF = async () => {
        const res = await getPDFNoBalanceds(family._id)
        const file = new Blob(
            [res.data],
            { type: 'application/pdf' }
        );
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL)
    }
    const handleGenerateBalance = async () => {
        try {
            await onGenerateBalance(family._id);
            history.push('/board')
        } catch (error) {
            console.log(error)
        }
    }
    const uploadImage = async(idloan, idfamily, data, handleProgress)=>dispatch(postImageLoan(idloan, idfamily, data, handleProgress));
    
    const handleUploadImage = async(files)=>{
        const uploadFiles = files.map((f) =>({
            file: f,
            id : uuidv4(),
            name : f.name,
            readableSize : fileSize(f.size),
            preview : URL.createObjectURL(f),
            progress : 0,
            uploaded : false,
            error : false,
            url : null
        }));
        setFilesUploaded([...filesUploaded,...uploadFiles])

        for( let uploadedFile of uploadFiles){
            const data = new FormData();
            data.append('file', uploadedFile.file, uploadedFile.name);
                uploadImage(addLoan.id, family._id, data, e=>{
                    const progress = parseInt(Math.round((e.loaded * 100) / e.total));
                    updateFile(uploadedFile.id, { progress})
                }).then( res=>{
                    updateFile(uploadedFile.id, {
                        uploaded : true,
                        url : res.url,
                        id: res.idimage
                    })

                }).catch(()=>{
                    updateFile(uploadedFile.id, { error : true})
                })
      
            
        }

    }
    const updateFile = (id, data)=>{
        let files;
        setFilesUploaded(state=>{
            files = state;
            return state
        })
        setFilesUploaded( files.map( fu =>{
            return fu.id === id?{...fu, ...data}:fu
                   }))
    }
    const deleteImage = async(idloan, idfamily, idimage)=>dispatch(deleteImageLoan(idloan, idfamily, idimage));

    const handleDelete = async (idloan, idfamily, idimage) => {
        setFilesUploaded( filesUploaded.filter( file => file.id !== idimage))
        await deleteImage(idloan, idfamily, idimage);
      };
    return (
        <TabPanel
            value={valueTab}
            key={index}
            index={index}
            className={classes.root}
        >
            <Typography variant='h6' align='center'>
                Panel de prestamos en {family.name}
            </Typography>
            <Accordion expanded={expanded === 'panelBalances'} onChange={handleExpandPanels('panelBalances')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography color='textPrimary' className={classes.summaryHeading}>Balances anteriores</Typography>
                    <Typography color='textSecondary' className={classes.summarySecondaryHeading}>Estos balances no se consideran en los prestamos siguientes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CListBalances idFamily={idFamily} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panelLoans'} onChange={handleExpandPanels('panelLoans')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography color='textPrimary' className={classes.summaryHeading}>Prestamos actuales</Typography>
                    <Typography color='textSecondary' className={classes.summarySecondaryHeading}>Prestamos que aún no han sigo balanceados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CListLoans idFamily={idFamily} />
                </AccordionDetails>
                {areLoans && <>
                    <Divider />
                    <AccordionActions className={classes.actions}>
                        <Button size='small' color='primary' variant='outlined' onClick={handleGetPDF} target='_blank'>Generar PDF</Button>
                        <Button size='small' color='secondary' variant='contained' onClick={handleGenerateBalance}>Generar Balance</Button>
                    </AccordionActions>
                </>}
            </Accordion>
            {(!addLoan.bool && areMembers) && <Button fullWidth variant='contained' color='primary' style={{ margin: '8px' }} onClick={() => setAddLoan({id : null, bool: true})}>Agregar prestamo</Button>}
            {addLoan.bool && <Stepper orientation='vertical' activeStep={activeStepAddLoan} className={classes.stepper}>
                <Step key='create loan'>
                    <StepLabel>Crear prestamo</StepLabel>
                    <StepContent className={classes.stepperContent}>
                        <CAddLoan setAddLoan={setAddLoan} setActiveStepAddLoan={setActiveStepAddLoan} family={family} />
                    </StepContent>
                </Step>
                <Step key='add photo'>
                    <StepLabel>Agregar fotos</StepLabel>
                    <StepContent>
                        <Upload handleUploadImage={handleUploadImage} />
                        { !!filesUploaded.length && <CListImages files={filesUploaded} idloan={addLoan.id} idfamily={family._id} handleDelete={handleDelete}/> }
                        <div className={classes.actions}>
                        <Button variant='contained' size='small' color={!!filesUploaded.length?'primary':'default'} onClick={() =>{ setAddLoan(false); setActiveStepAddLoan(0); setFilesUploaded([])}}>{!!filesUploaded.length?'Finalizar':'Omitir'}</Button>
                        </div>
                    </StepContent>
                </Step>

            </Stepper>
            }
        </TabPanel>
    )
}
function TabPanel(props) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${xs ? 'vertical' : 'scrollable-auto'}-tabpanel-${index}`}
            aria-labelledby={`${xs ? 'vertical' : 'scrollable-auto'}-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}
export default TabPanelBoard
