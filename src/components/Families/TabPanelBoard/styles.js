import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    root:{
        padding : theme.spacing(3),
        maxWidth : '800px',
        [theme.breakpoints.down('xs')]:{
            padding : theme.spacing(2,1),
            maxWidth : '300px'
        }

    },
    summaryHeading : {
        flexBasis : '33.33%',
        flexShrink : 0,
        fontSize : theme.typography.pxToRem(15),
        fontWeight : 700,
        paddingRight : theme.spacing(1)
    },
    summarySecondaryHeading : {
        fontSize : theme.typography.pxToRem(15)
    },
    actions : {
        display : 'flex',
        justifyContent : 'space-evenly',
        marginTop : theme.spacing(2)
    },
    stepper : {
        padding : theme.spacing(3,0 )
    },
    stepperContent : {
        padding : theme.spacing(1,0 )
    }
}))