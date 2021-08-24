import {
    Typography, Accordion, AccordionSummary, AccordionDetails,
    useTheme, useMediaQuery, Button, AccordionActions, Divider,
    Stepper, Step, StepLabel, StepContent, Dialog, DialogTitle,
    DialogActions, DialogContent, DialogContentText, Backdrop, CircularProgress
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
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

function TabPanelBoard({ families, family, index, valueTab, getPDFNoBalanceds, onGenerateBalance }) {
    const [expanded, setExpanded] = useState(false);
    const [areLoans, setAreLoans] = useState(false);
    const [areMembers, setAreMembers] = useState(false);
    const [addLoan, setAddLoan] = useState({ id: null, bool: false });
    const [filesUploaded, setFilesUploaded] = useState([]);
    const [activeStepAddLoan, setActiveStepAddLoan] = useState(0);
    const [openGenBalance, setOpenGenBalance] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [preBalance, setPreBalance] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme()
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user.username);
    const userIsAdmin = family?.admins?.some(admin => admin.username === user)
    const handleExpandPanels = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    const handleNotifyVariant = (variant, message) => {
        enqueueSnackbar(message, { variant })
    }
    useEffect(() => {
        if (family.no_balanceds && family.no_balanceds.length !== 0) setAreLoans(true)
        if (family.no_balanceds && family.no_balanceds.length === 0) setAreLoans(false)
        if (family.members && family.members.length !== 0) setAreMembers(true)
        if (family.members && family.members.length === 0) setAreMembers(false)
        if (family.members && family.no_balanceds && family.no_balanceds.length !== 0) setPreBalance(getPreBalance(family.no_balanceds, family.members));
    }, [family]);
    const idFamily = family._id;
    const classes = useStyles();
    const getPreBalance = (no_balanceds, members) => {
        return members.map(member => {
            const SubBalancesWithMember = no_balanceds.filter(loan => loan.sub_balance.some(s => s.username === member.username))
                .map(l => l.sub_balance);
            const subBalance = SubBalancesWithMember.map(subBalance => subBalance.find(s => s.username === member.username))
                .map(e => e.amount);
            const totalAmount = Math.round(subBalance.reduce((acc, amount) => acc + amount, 0) * 100) / 100;
            return (
                {
                    username: member.username,
                    amount: totalAmount
                }
            )
        })
    }
    const handleGetPDF = async () => {
        try {
            setOpenBackDrop(true);
            const res = await getPDFNoBalanceds(family._id);
            setOpenBackDrop(false);
            const file = new Blob(
                [res.data],
                { type: 'application/pdf' }
            );
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL)
        } catch (error) {
            console.log(error)
        }
    }
    const handleGenerateBalance = async () => {
        try {
            handleCloseGenBalance();
            setOpenBackDrop(true);
            const resBalance = await onGenerateBalance(family._id);
            setOpenBackDrop(false);
            handleNotifyVariant('success', resBalance)
            history.push('/board')
        } catch (error) {
            if (error.status === 400) {
                handleNotifyVariant('warning', error.message);
            }
            if (error.status === 404) {
                handleNotifyVariant('error', error.message);
            }
        }
    }
    const uploadImage = async (idloan, idfamily, data, handleProgress) => dispatch(postImageLoan(idloan, idfamily, data, handleProgress));

    const handleUploadImage = async (files) => {
        const uploadFiles = files.map((f) => ({
            file: f,
            id: uuidv4(),
            name: f.name,
            readableSize: fileSize(f.size),
            preview: URL.createObjectURL(f),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }));
        setFilesUploaded([...filesUploaded, ...uploadFiles])

        for (let uploadedFile of uploadFiles) {
            const data = new FormData();
            data.append('file', uploadedFile.file, uploadedFile.name);
            uploadImage(addLoan.id, family._id, data, e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));
                updateFile(uploadedFile.id, { progress })
            }).then(res => {
                updateFile(uploadedFile.id, {
                    uploaded: true,
                    url: res.url,
                    id: res.idimage
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
    const deleteImage = async (idloan, idfamily, idimage) => dispatch(deleteImageLoan(idloan, idfamily, idimage));

    const handleDelete = async (idloan, idfamily, idimage) => {
        setFilesUploaded(filesUploaded.filter(file => file.id !== idimage))
        await deleteImage(idloan, idfamily, idimage);
    };
    const handleOpenGenBalance = () => {
        setOpenGenBalance(true)
    }
    const handleCloseGenBalance = () => {
        setOpenGenBalance(false)
    }
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
                <AccordionDetails style={{ flexDirection: 'column' }}>
                    <CListLoans family={family} idFamily={idFamily} />
                    {!!preBalance && <div className={classes.containerPreBalance}>
                        <Typography variant='body2' align='center' style={{ margin: '16px auto', fontWeight: 'bold' }}>Pre-balance</Typography>
                        <div>
                            {preBalance.map(pre => <span key={pre.username}><b>{pre.username}: </b><span style={{ color: (pre.amount < 0) ? 'red' : 'blue' }}>s/{pre.amount}</span>&nbsp;&nbsp;</span>)}
                        </div>
                    </div>}
                </AccordionDetails>
                {areLoans && <>
                    <Divider />
                    <AccordionActions className={classes.actions}>
                        <Button size='small' color='primary' variant='outlined' onClick={handleGetPDF} target='_blank'>Generar PDF</Button>
                        {userIsAdmin && <Button size='small' color='secondary' variant='contained' onClick={handleOpenGenBalance}>Generar Balance</Button>}
                    </AccordionActions>
                    <Dialog fullWidth={xs} maxWidth={xs ? 'xs' : 'sm'} open={openGenBalance} onClose={handleCloseGenBalance}>
                        <DialogTitle>
                            Generar Balance
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Al generar balance, los prestamos actuales serán balanceados y ya no se podrán editar.
                                Revise que sean correctos y confirme o si ya lo hizo, confirme por favor.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button size='small' color='secondary' variant='contained' onClick={handleGenerateBalance}>Balancear</Button>
                            <Button size='small' color='default' onClick={handleCloseGenBalance}>Cancelar</Button>
                        </DialogActions>
                    </Dialog>
                    <Backdrop open={openBackDrop} className={classes.backdrop}>
                        <CircularProgress color='inherit' />
                    </Backdrop>
                </>}
            </Accordion>
            {(!addLoan.bool && areMembers) && <Button fullWidth variant='contained' color='primary' style={{ margin: '8px' }} onClick={() => setAddLoan({ id: null, bool: true })}>Agregar prestamo</Button>}
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
                        {!!filesUploaded.length && <CListImages files={filesUploaded} idloan={addLoan.id} idfamily={family._id} handleDelete={handleDelete} />}
                        <div className={classes.actions}>
                            <Button variant='contained' size='small' color={!!filesUploaded.length ? 'primary' : 'default'} onClick={() => { setAddLoan(false); setActiveStepAddLoan(0); setFilesUploaded([]) }}>{!!filesUploaded.length ? 'Finalizar' : 'Omitir'}</Button>
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
