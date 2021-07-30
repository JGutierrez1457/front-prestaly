import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
containerLoans : {
    display : 'flex',
    justifyContent:'space-evenly',
    flexWrap : 'wrap',
    margin : theme.spacing(1,0)
},
containerHeader:{
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
},
subBalance:{
    display:'flex',
    flexWrap : 'noWrap',
    [theme.breakpoints.down('xs')]:{
        margin : theme.spacing(0,1)
    }
},
divider:{
    height: '2px',
    backgroundColor : theme.palette.text.disabled
},
title:{
    display:'flex',
    justifyContent : 'space-between',
    '& .MuiIconButton-root':{
        padding : 0
    }
},
spendersEdit:{
    display: 'flex',
    justifyContent : 'space-evenly',
    alignItems : 'flex-end',
    '& .MuiButtonBase-root':{
        paddingBottom : 0,
        borderRadius : 0
    }
},
containerSpendersEdit:{
    display : 'flex',
    flexDirection : 'column',
    alignItems :'stretch',
    margin : theme.spacing(2,0)
}
}))