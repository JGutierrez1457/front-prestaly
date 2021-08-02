import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
spendersEdit:{
    display: 'flex',
    justifyContent : 'space-evenly',
    alignItems : 'flex-end'
},
containerSpendersEdit:{
    display : 'flex',
    flexDirection : 'column',
    alignItems :'stretch',
    margin : theme.spacing(2,0)
},
containerBeneficiaries:{
    display : 'flex',
    justifyContent : 'center',
    marginBottom : theme.spacing(2)
},
containerProducts:{
    display : 'flex',
    justifyContent : 'space-evenly',
    '& .MuiTextField-root':{
        width : '25%',
        [theme.breakpoints.down('xs')]:{
            width : '80%',
        }
    },
    [theme.breakpoints.down('xs')]:{
        flexWrap :'wrap',
        justifyContent : 'center',
        '& .MuiButtonBase-root':{
            width : '80%',
            marginBottom : theme.spacing(3)
        }
    }
},
containerProductMember:{
    display : 'flex',
    flexDirection :'column',
    alignItems : 'stretch',
    marginBottom : theme.spacing(2),
    padding : theme.spacing(1, 2)
},
containerMemberProducts:{
    display : 'flex',
},
containerButton:{
    display : "flex",
    justifyContent : 'space-evenly',
    margin : theme.spacing(2, 0)
},
backdrop:{
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
}
}))