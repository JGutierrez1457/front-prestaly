import { connect } from 'react-redux'
import SignUp from '../../components/Auth/SignUp/SignUp';
import {signup } from '../../actions/auth'

const mapDispatchToProps = (dispatch)=>{
    return {
        handleSignUp : (dataUser)=>dispatch(signup(dataUser))
    }
}
const CSignUp = connect(null, mapDispatchToProps)(SignUp);
export default CSignUp;