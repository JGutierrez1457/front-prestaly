import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    container:{
        display : 'flex',
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center',
        padding : theme.spacing(1.5),
        borderStyle : 'dashed',
        borderWidth : '2px',
        borderRadius : '2px',
        borderColor : theme.palette.divider,
        backgroundColor : '#fafafa',
        color : '#bdbdbd',
        outline : 'none',
        transition : theme.transitions.create('border',{
            easing : theme.transitions.easing.easeInOut,
            duration : theme.transitions.duration.enteringScreen
        })
    },
    dragActive : {
        borderColor : '#78e5d5'
    },
    dragReject :{
        borderColor : '#e57878'
    },
    dragAccept :{
        borderColor : '#00e676'
    }
}))