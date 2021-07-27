import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    summaryHeading : {
        flexBasis : '33.33%',
        flexShrink : 0,
        fontSize : theme.typography.pxToRem(15),
        fontWeight : 700
    },
    summarySecondaryHeading : {
        fontSize : theme.typography.pxToRem(15)
    }
}))