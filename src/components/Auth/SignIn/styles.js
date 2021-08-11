import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    containerPaper:{
        display: 'flex',
        justifyContent : 'center',
        flexDirection : 'column',
        '& > a':{
            margin : '64px auto',
            [theme.breakpoints.down('xs')]:{
                margin : '32px auto'
            }
        }
    },
    paper : {
        padding: theme.spacing(4,6),
        margin : theme.spacing(0,40),
        display : 'flex',
        flexDirection : 'column',
        [theme.breakpoints.down('xs')]:{
            margin: theme.spacing(0,7)
        },
        '& .MuiButton-root':{
            display : 'block',
            margin : '16px auto',
            backgroundColor : theme.palette.grey[900],
             color : theme.palette.getContrastText(grey[900]),
            '&:hover':{
             backgroundColor : theme.palette.grey[700]
             }
        },
        '& form > .MuiGrid-container':{
            margin : theme.spacing(2, 0),
            [theme.breakpoints.down('xs')]:{
                flexWrap : 'nowrap'
            }
        }
    }
}))