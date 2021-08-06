import { makeStyles } from '@material-ui/core/styles'
const drawerWidth = 240;
export default makeStyles((theme)=>({
    root:{
        display : 'flex'
    },
    title:{
        margin : theme.spacing(1, 0)
    }
    ,
    containerAvatar :{
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        margin : theme.spacing(2,0)
    },
    containerAvatarOpen :{
        height : theme.spacing(14),
        transition : theme.transitions.create(['height'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.enteringScreen
        })
    },
    containerAvatarClose :{
        transition : theme.transitions.create(['height'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.leavingScreen
        }),
        overflowX : 'hidden',
        overflowY : 'hidden',
        height : theme.spacing(6)
    },
    avatarOpen : {
        width : theme.spacing(8),
        height : theme.spacing(8),
        borderRadius : 0,
        transition : theme.transitions.create(['width', 'height'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.enteringScreen
        })
    },
    avatarClose : {
        transition : theme.transitions.create(['width', 'height'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.leavingScreen
        }),
        width : theme.spacing(5),
        height : theme.spacing(5),
        borderRadius : 0
    }, 
    paper: {
        background : "#A43232"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiTypography-root':{
            color : theme.palette.background.paper
        },
        '& .MuiSvgIcon-root':{
            fill : "white"
        }
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      buttonDrawer : {
          borderRadius : 0
      }
}))