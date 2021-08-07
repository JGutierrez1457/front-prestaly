import { connect } from 'react-redux'
import ListImages from '../../components/ListImages/ListImages'
const mapStateToProps = (state, ownProps)=>{
    return {
        files : ownProps.files
    }
}

const CListImages = connect( mapStateToProps, null)(ListImages);
export default CListImages;