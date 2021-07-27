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
        width : 'auto',
        overflowX : 'auto',
        '& .MuiListSubheader-root':{
            whiteSpace : 'nowrap'
        } ,
        '& .MuiButtonBase-root':{
            margin : theme.spacing(0,3),
        }
    },
    listButton :{
        display : 'flex',
        flexDirection : 'row',
        '& .MuiButtonBase-root':{
            margin : theme.spacing(0,3),
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
        justifyContent : 'stretch',
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
        width : 'auto',
        overflowX : 'auto',
        '& .MuiListSubheader-root':{
            display :'flex',
            flexDirection : 'column',
            justifyContent : 'center'
        },
        '& .MuiList-root':{
                display : 'flex',
                flexDirection : 'row',
                width : 'auto',
                overflowX : 'auto'
        }
    },
    listItem :{
        display :'flex',
        flexDirection : 'column',
        alignContent :'center',
        maxWidth : theme.spacing(10) ,
        '& .MuiListItemIcon-root':{
            justifyContent : 'center'
        },
        [theme.breakpoints.down('xs')]:{
            maxWidth : theme.spacing(5),
        }
    },
    backdrop:{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))