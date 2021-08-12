import { connect } from 'react-redux'
import { postImageLoan } from '../../actions/families'
import Upload from '../../components/Upload/Upload'
const mapDispatchToprops = (dispatch)=>{
    return {
        handleUploadImage : (idloan, idfamily, formData, progress)=>dispatch(postImageLoan(idloan, idfamily, formData, progress))
    }
}

const CUpload = connect(null, mapDispatchToprops)(Upload)
export default CUpload;