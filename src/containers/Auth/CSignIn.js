import { connect } from 'react-redux'
import SignIn from '../../components/Auth/SignIn/SignIn';
import { signin } from '../../actions/auth';
import { getMembersFamily } from '../../actions/families';

const mapDispatchToProps = (dispatch)=>{
    return {
        handleLogin : (dataUser)=>dispatch(signin(dataUser)),
        handleGetFamilies : ()=>dispatch(getMembersFamily())
    }
}
const CSignIn = connect(null, mapDispatchToProps)(SignIn);
export default CSignIn;