import { connect } from 'react-redux'
import ListBalances from '../../components/Balances/ListBalances/ListBalances'
import { getBalancesFamily } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        idFamily : ownProps.idFamily,
        family : state.families.find(family => family._id === ownProps.idFamily),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
      handleGetBalancesFamily : (cancel, idfamily)=>dispatch(getBalancesFamily(cancel, idfamily))
    }
}
const CListBalances = connect(mapStateToProps, mapDispatchToProps)(ListBalances);
export default CListBalances;