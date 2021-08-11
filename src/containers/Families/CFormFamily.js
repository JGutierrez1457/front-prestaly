import { connect } from 'react-redux'
import FormFamily from '../../components/FormFamily/FormFamily';
import { addFamily } from './../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        setCreateFamily : ownProps.setCreateFamily
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleAddFamily : (dataFamily)=>dispatch(addFamily(dataFamily))
    }
}
const CFormFamily = connect(mapStateToProps, mapDispatchToProps)(FormFamily)
export default CFormFamily;