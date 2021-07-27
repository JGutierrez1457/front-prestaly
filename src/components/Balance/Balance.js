import { Divider, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';
import GetAppIcon from '@material-ui/icons/GetApp';

function Balance({creator, file, balance, date}) {
    const classes = useStyle();
    return (
        <>
        <Divider />
        <div className={classes.containerHeader}>
        <Typography variant='body2' style={{ fontStyle: 'italic', display:'inline-block'}} align='center' color='textSecondary'>Creado por {creator.username} el {date}</Typography>
        <IconButton href={file.url} target='_blank'>
            <GetAppIcon />
        </IconButton>
        </div>
        {''}
        <div className={classes.containerBalances}>
        {balance.map( (b, index)=>(<div key={index}><b>{b.username} : </b><span>{b.amount}</span></div>))}
        </div>
        </>
    )
}

export default Balance
