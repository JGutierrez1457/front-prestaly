import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme) => ({
    imagePrestaly: {
        display: 'block',
        margin: '16px auto'
    },
    buttons: {
        width: '300px',
        margin: '8px auto',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    bttnLogin:{
        backgroundColor : theme.palette.grey[900],
        color : theme.palette.getContrastText(grey[900]),
        '&:hover':{
            backgroundColor : theme.palette.grey[700]
        }
    },
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& a': {
            margin: theme.spacing(0, 2)
        },
        '& svg': {
            transition: theme.transitions.create(['height', 'width', 'fill'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        '& svg:hover': {
            height: '50px',
            width: '50px'
        }
    },
    logoGmail: {
        '&:hover': {
            fill: "#EA4335"
        }
    },
    logoIn: {
        '&:hover': {
            fill: "#0E76A8"
        }
    }
}))