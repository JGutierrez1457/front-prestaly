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
title:{
    display:'flex',
    justifyContent : 'space-between',
    '& .MuiIconButton-root':{
        padding : 0
    }
}
}))