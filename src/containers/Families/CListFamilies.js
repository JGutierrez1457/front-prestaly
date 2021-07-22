import { connect } from 'react-redux'
import ListFamilies from '../../components/Families/ListFamilies/ListFamilies'
import { getMembersFamily, addMemberFamily } from '../../actions/families';

const mapStateToProps = (state, ownProps)=>{
    return {
        families : state.families
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleGetFamilies : ()=>dispatch(getMembersFamily()),
        handleAddMember : (idfamily, username)=>dispatch(addMemberFamily(idfamily, username))
    }
}
const CListFamilies = connect(mapStateToProps, mapDispatchToProps)(ListFamilies)
export default CListFamilies;