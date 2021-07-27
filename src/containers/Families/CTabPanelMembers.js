import { connect } from 'react-redux'
import TabPanelMembers from '../../components/Families/TabPanelMembers/TabPanelMembers'
import {  getMembersFamily,addMemberFamily, removeMemberFamily, addAdminFamily, removeAdminFamily } from '../../actions/families';


const mapStateToProps = (state, ownProps)=>{
    return {
        families : state.families,
        family : state.families.find(family => family._id === ownProps.idfamily),
        index : ownProps.index,
        valueTab : ownProps.valueTab,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleGetMembersFamily : (cancel, idfamily)=>dispatch(getMembersFamily(cancel, idfamily)),
        handleAddMember : (idfamily, username)=>dispatch(addMemberFamily(idfamily, username)),
        handleRemoveMember : (idfamily, username)=>dispatch(removeMemberFamily(idfamily, username)),
        handleAddAdmin : (idfamily, username)=>dispatch(addAdminFamily(idfamily, username)),
        handleRemoveAdmin : (idfamily, username)=>dispatch(removeAdminFamily(idfamily, username)),
    }
}
const CTabPanelMembers = connect(mapStateToProps, mapDispatchToProps)(TabPanelMembers)
export default CTabPanelMembers;