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
        padding: theme.spacing(4,4),
        margin : theme.spacing(0,30),
        display : 'flex',
        flexDirection : 'column',
        [theme.breakpoints.down('xs')]:{
            margin: theme.spacing(0,6),
            padding : theme.spacing(2,2)
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
    },
    infoName:{
        flexWrap : 'nowrap',
        [theme.breakpoints.down('xs')]:{
            alignItems : 'flex-start',
            '& div:first-child svg':{
                marginTop : theme.spacing(3)
            }
        }
    },
    password:{
        flexWrap : 'nowrap',
        [theme.breakpoints.down('xs')]:{
            alignItems : 'flex-start',
            '& div:first-child svg':{
                marginTop : theme.spacing(3)
            },
            '& div:last-child button':{
                top : theme.spacing(2),
                padding : theme.spacing(1)
            }
        }

    }
}))