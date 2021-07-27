import { connect } from 'react-redux'
import ListLoans from '../../components/Loans/ListLoans/ListLoans'
import { getNoBalancedsFamily } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        idFamily : ownProps.idFamily,
        family : state.families.find(family => family._id === ownProps.idFamily),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
      handleGetNoBalancedsFamily : (cancel, idfamily)=>dispatch(getNoBalancedsFamily(cancel, idfamily))
    }
}
const CListLoans = connect(mapStateToProps, mapDispatchToProps)(ListLoans);
export default CListLoans;