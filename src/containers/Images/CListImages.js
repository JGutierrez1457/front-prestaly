import { connect } from 'react-redux'
import ListImages from '../../components/ListImages/ListImages'
const mapStateToProps = (state, ownProps)=>{
    return {
        files : ownProps.files,
        idloan : ownProps.idloan,
        idfamily : ownProps.idfamily,
        handleDelete : ownProps.handleDelete
    }
}


const CListImages = connect( mapStateToProps, null)(ListImages);
export default CListImages;