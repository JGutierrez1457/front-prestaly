import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    root:{
        padding : theme.spacing(3),
        maxWidth : '800px',
        [theme.breakpoints.down('xs')]:{
            padding : theme.spacing(2,1),
        }

    },
    list :{
        display : 'flex',
        flexDirection : 'row',
        maxWidth : '650px',
        overflowX : 'auto',
        marginLeft : theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            maxWidth : '250px'
        }
    },
    deleteFamily:{
        position : 'fixed',
        top : theme.spacing(9),
        right : theme.spacing(5),
        [theme.breakpoints.down('xs')]:{
            top : theme.spacing(14)
        }
    },
    listButton :{
        display : 'flex',
        flexDirection : 'row',
        '& .MuiButtonBase-root':{
            margin : theme.spacing(1,3),
        },       
        [theme.breakpoints.down('xs')]:{
            flexDirection : 'column',
            alignItems : 'center',
            '& .MuiButtonBase-root':{
                margin : theme.spacing(2,0),
            },
        }
    },
    containerList : {
        display : 'flex',
        alignItems : 'center',
        [theme.breakpoints.down('xs')]:{
           flexDirection : 'column'
        }
    },
    containerListTrash : {
        display : 'flex',
        flexDirection :'column',
        alignItems : 'stretch',
        '& .MuiSvgIcon-root':{
            margin : '0 auto'
        }
    },
    listButtons :{
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        '& .MuiButtonBase-root':{
            margin : theme.spacing(0,3),
            [theme.breakpoints.down('xs')]:{
                margin : theme.spacing(0,0.5),
             }
        }
    },
    listTrash :{
        display : 'flex',
        flexDirection : 'row',
        border : '2px solid red',
        borderRadius : '10px',
        maxWidth : '650px',
        overflowX : 'auto',
        [theme.breakpoints.down('xs')]:{
            maxWidth : '250px'
        }
    },
    listItem :{
        display :'flex',
        flexDirection : 'column',
        alignContent :'center',
        width : 'auto' ,
        padding : theme.spacing(0),
        '& .MuiListItemIcon-root':{
            justifyContent : 'center'
        }
    },
    backdrop:{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))