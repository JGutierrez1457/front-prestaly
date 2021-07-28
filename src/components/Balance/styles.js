import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
containerBalances : {
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
balance:{
    display:'flex',
    flexWrap : 'noWrap',
    [theme.breakpoints.down('xs')]:{
        margin : theme.spacing(0,1)
    }
},
divider:{
    height: '2px',
    backgroundColor : theme.palette.text.disabled
}
}))