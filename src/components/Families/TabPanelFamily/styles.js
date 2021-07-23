import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    list :{
        display : 'flex',
        flexDirection : 'row',
        '& .MuiListSubheader-root':{
            whiteSpace : 'nowrap'
        } ,
        '& .MuiButtonBase-root':{
            margin : theme.spacing(0,3),
        }
    },
    listButtons :{
        display : 'flex',
        flexDirection : 'row',
        '& .MuiListItem-root':{
            justifyContent : 'center'
        },
        '& .MuiButtonBase-root':{
            margin : theme.spacing(0,3),
        }
    },
    listTrash :{
        display : 'flex',
        flexDirection : 'row',
        border : '2px solid red',
        borderRadius : '10px',
        '& .MuiListSubheader-root':{
            display :'flex',
            flexDirection : 'column',
            justifyContent : 'center'
        }
    },
    listItem :{
        display :'flex',
        flexDirection : 'column',
        alignContent :'center',
        maxWidth : theme.spacing(10) ,
        '& .MuiListItemIcon-root':{
            justifyContent : 'center'
        }
    },
    backcrop:{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))