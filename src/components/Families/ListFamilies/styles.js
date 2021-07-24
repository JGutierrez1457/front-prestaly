import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    root : {
        flexGrow: 1,
        backgroundColor : theme.palette.background.paper,
        display : 'flex',
        height : 'auto',
        [theme.breakpoints.down('xs')]:{
            flexDirection : 'column'
        }
    },
    tabs : {
        borderRadius:  `1px solid ${theme.palette.divider}`
    }
}))