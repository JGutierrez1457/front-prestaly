import { connect } from 'react-redux'
import SignIn from '../../components/Auth/SignIn/SignIn';
import { signin } from '../../actions/auth';

const mapDispatchToProps = (dispatch)=>{
    return {
        handleLogin : (dataUser)=>dispatch(signin(dataUser)),
    }
}
const CSignIn = connect(null, mapDispatchToProps)(SignIn);
export default CSignIn;