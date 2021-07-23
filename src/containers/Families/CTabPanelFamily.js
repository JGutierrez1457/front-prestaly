import { connect } from 'react-redux'
import TabPanelFamily from '../../components/Families/TabPanelFamily/TabPanelFamily'
import { addMemberFamily, removeMemberFamily, addAdminFamily, removeAdminFamily } from '../../actions/families';


const mapStateToProps = (state, ownProps)=>{
    return {
        families : state.families,
        family : state.families.find(family => family._id === ownProps.idfamily),
        index : ownProps.index,
        valueTab : ownProps.valueTab,
        setValueTab : ownProps.setValueTab,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleAddMember : (idfamily, username)=>dispatch(addMemberFamily(idfamily, username)),
        handleRemoveMember : (idfamily, username)=>dispatch(removeMemberFamily(idfamily, username)),
        handleAddAdmin : (idfamily, username)=>dispatch(addAdminFamily(idfamily, username)),
        handleRemoveAdmin : (idfamily, username)=>dispatch(removeAdminFamily(idfamily, username)),
    }
}
const CListFamilies = connect(mapStateToProps, mapDispatchToProps)(TabPanelFamily)
export default CListFamilies;