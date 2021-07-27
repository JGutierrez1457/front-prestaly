import { connect } from 'react-redux'
import TabPanelBoard from '../../components/Families/TabPanelBoard/TabPanelBoard'
import { getPDFNoBalanceds } from '../../api'
import { generateBalanceByFamily } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        families : state.families,
        family : state.families.find(family => family._id === ownProps.idfamily),
        index : ownProps.index,
        valueTab : ownProps.valueTab,
        getPDFNoBalanceds : (idfamily)=>getPDFNoBalanceds(idfamily)
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onGenerateBalance : (idfamily)=>dispatch(generateBalanceByFamily(idfamily))
    }
}

const CTabPanelBoard = connect(mapStateToProps, mapDispatchToProps)(TabPanelBoard)
export default CTabPanelBoard;