import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    containerPaper:{
        display: 'flex',
        justifyContent : 'center'
    },
    paper : {
        padding: theme.spacing(4,4),
        margin : theme.spacing(2,40),
        display : 'flex',
        flexDirection : 'column',
        [theme.breakpoints.down('xs')]:{
            margin: theme.spacing(2,3)
        },
        '& .MuiTextField-root':{
            margin : theme.spacing(1,0)
        },
        '& .MuiButton-root':{
            margin : theme.spacing(2,0)
        }
    }
}))