import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    container:{
        display : 'flex',
        flexDirection : 'column',
        marginTop : theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            minWidth : '50%',
            margin : '16px auto'
        }
    },
    containerFile : {
        display : 'flex',
        justifyContent : 'space-between',
        flexWrap : 'nowrap',
        alignItems : 'center',
        '& + div':{
            marginTop : theme.spacing(2)
        }
    },
    imagePreview:{
        display : 'flex',
        alignItems : 'center',
        [theme.breakpoints.down('xs')]:{
            width : '135px'
        }
    },
    image :{
        width : '36px',
        height : '36px',
        marginRight : theme.spacing(1),
        borderRadius : '5px'
    },
    imgInfo : {
        display : 'flex',
        flexDirection : 'column',
        width:'100%',
        '& button':{
            border : 0,
            background : 'transparent',
            cursor : 'pointer',
            color : 'GrayText'
        },
        [theme.breakpoints.down('xs')]:{
            width : '91px'
        }
    },
    imgName:{
        width:'100%',
        overflow:'hidden',
        whiteSpace:'nowrap',
        textOverflow: 'ellipsis'
    },
    fileStatus:{
        display	: 'flex',
        alignItems : 'center',
        '& > *':{
            margin : '0 4px'
        }
    }
}))