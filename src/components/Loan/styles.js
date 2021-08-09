import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
containerLoans : {
    display : 'flex',
    justifyContent:'space-evenly',
    flexWrap : 'wrap',
    margin : theme.spacing(1,0)
},
containerHeader:{
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
},
subBalance:{
    display:'flex',
    flexWrap : 'noWrap',
    [theme.breakpoints.down('xs')]:{
        margin : theme.spacing(0,1)
    }
},
title:{
    display:'flex',
    justifyContent : 'space-between',
    marginBottom : theme.spacing(2),
    '& .MuiIconButton-root':{
        padding : 0
    }
},
loanContainer:{
    display : 'flex',
    justifyContent : 'space-between',
    [theme.breakpoints.down('xs')]:{
        flexDirection : 'column'
    }
},
stepper : {
    padding : theme.spacing(3,0 )
},
stepperContent : {
    padding : theme.spacing(1,1 )
},
image :{
    maxWidth : '300px',
    maxHeight : '200px',
    overflow : 'hidden',
    display : 'block',
    width : '100%',
    [theme.breakpoints.down('xs')]:{
        maxWidth : '100%'
    }
},
containerImages:{
    width : '300px',
    '& .MuiPaper-root':{
        background : theme.palette.divider
    },
    [theme.breakpoints.down('xs')]:{
        width : '100%',
        '& .MuiButtonBase-root':{
            fontSize : '0.6rem',
            padding : '4px 0px'
        },
        '& .MuiPaper-root':{
            padding : 0
        }
    }
},
containerImage:{
    height:'200px', 
    background : 'black',
    display : 'flex',
    alignItems : 'center'
},
actions : {
    display : 'flex',
    justifyContent : 'space-evenly',
    marginTop : theme.spacing(2)
}
}))