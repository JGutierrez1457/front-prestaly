import { connect } from 'react-redux'
import AddLoan from '../../components/AddLoan/AddLoan'
import { addLoan } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
      setAddLoan : ownProps.setAddLoan,
      setActiveStepAddLoan : ownProps.setActiveStepAddLoan,
      members : ownProps.family.members?.map(m => m.username),
      idfamily : ownProps.family._id
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleCreateLoan : (idloan, data)=>dispatch(addLoan(idloan, data))
    }
}
const CAddLoan = connect(mapStateToProps, mapDispatchToProps)(AddLoan);
export default CAddLoan;