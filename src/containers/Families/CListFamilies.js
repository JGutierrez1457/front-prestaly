import { connect } from 'react-redux'
import ListFamilies from '../../components/Families/ListFamilies/ListFamilies'
import { getMembersFamily, addMemberFamily } from '../../actions/families';

const mapStateToProps = (state, ownProps)=>{
    return {
        families : state.families,
        children : ownProps.children
    }
}
const CListFamilies = connect(mapStateToProps, null)(ListFamilies)
export default CListFamilies;