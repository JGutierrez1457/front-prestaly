import { connect } from 'react-redux'
import ListLoans from '../../components/ListLoans/ListLoans'
import { getNoBalancedsFamily, updateLoan } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        idFamily : ownProps.idFamily,
        family : state.families.find(family => family._id === ownProps.idFamily),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
      handleGetNoBalancedsFamily : (cancel, idfamily)=>dispatch(getNoBalancedsFamily(cancel, idfamily)),
      handleUpdateLoan : (idloan, idfamily, data)=>dispatch(updateLoan(idloan, idfamily, data))
    }
}
const CListLoans = connect(mapStateToProps, mapDispatchToProps)(ListLoans);
export default CListLoans;