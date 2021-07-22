import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    root : {
        flexGrow: 1,
        backgroundColor : theme.palette.background.paper,
        display : 'flex',
        height : 'auto'
    },
    tabs : {
        borderRadius:  `1px solid ${theme.palette.divider}`
    },
    list :{
        display : 'flex',
        flexDirection : 'row',
        '& .MuiListSubheader-root':{
            whiteSpace : 'nowrap'
        } ,
        '& .MuiButton-root':{
            margin : theme.spacing(0,3)
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
    }
}))