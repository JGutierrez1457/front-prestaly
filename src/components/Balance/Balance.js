import { Divider, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import dateFormat from 'dateformat';

function Balance({creator, file, balance, date}) {
    const classes = useStyle();
    return (
        <>
        <Divider className={classes.divider} />
        <div className={classes.containerHeader}>
        <Typography variant='body2' style={{ fontStyle: 'italic', display:'inline-block'}} align='center' color='textSecondary'>Generado por {creator.username} el {dateFormat(date, "dd/mm/yyyy h:MM:ss TT")}</Typography>
        <IconButton href={file.url} target='_blank'>
            <GetAppIcon />
        </IconButton>
        </div>
        {''}
        <div className={classes.containerBalances}>
        {balance.map( (b, index)=>(<div key={index} className={classes.balance}><b>{b.username}:&nbsp;</b><b style={{ color : b.amount<0?'#f44336':'#3f51b5', }}>{((b.amount<0)?('-s/'):('s/'))+Math.abs(b.amount)}</b></div>))}
        </div>
        </>
    )
}

export default Balance
