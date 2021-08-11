import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme)=>({
    paper : {
        padding: theme.spacing(4,4),
        margin : theme.spacing(2,24),
        display : 'flex',
        flexDirection : 'column',
        '& form > .MuiGrid-container':{
            margin : theme.spacing(2, 0),
        },
        [theme.breakpoints.down('xs')]:{
            margin : theme.spacing(2,1),
            padding: theme.spacing(4,1),
            '& form > .MuiGrid-container':{
                margin : theme.spacing(2, 0),
                flexWrap : 'nowrap'
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

    },
    buttons:{
        display : "flex",
    justifyContent : 'space-evenly',
    margin : theme.spacing(2, 0)
    }
}))