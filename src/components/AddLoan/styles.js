import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme)=>({
paper:{
    margin : theme.spacing(3,2),
    padding : theme.spacing(2,2)
},
containerSpendersEdit:{
    display : 'flex',
    flexDirection : 'column',
    alignItems :'stretch',
    margin : theme.spacing(2,0)
},
spendersEdit:{
    display: 'flex',
    justifyContent : 'space-evenly',
    alignItems : 'flex-end'
},
containerBeneficiaries:{
    display : 'flex',
    justifyContent : 'center',
    marginBottom : theme.spacing(2)
},
containerProducts:{
    display : 'flex',
    justifyContent : 'space-evenly'
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