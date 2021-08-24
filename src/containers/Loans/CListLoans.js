import { connect } from 'react-redux'
import ListLoans from '../../components/ListLoans/ListLoans'
import { getNoBalancedsFamily, postImageLoan, updateLoan, deleteImageLoan, deleteLoan } from '../../actions/families'

const mapStateToProps = (state, ownProps)=>{
    return {
        idFamily : ownProps.idFamily,
        family : ownProps.family,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
      handleGetNoBalancedsFamily : (cancel, idfamily)=>dispatch(getNoBalancedsFamily(cancel, idfamily)),
      handleUpdateLoan : (idloan, idfamily, data)=>dispatch(updateLoan(idloan, idfamily, data)),
      handleUploadImage : (idloan, idfamily, data, handleprogress)=>dispatch(postImageLoan(idloan, idfamily, data, handleprogress)),
      handleDeleteImage : (idloan, idfamily, idimage)=>(dispatch(deleteImageLoan(idloan, idfamily, idimage))),
      handleDeleteLoan : (idloan, idfamily)=>dispatch(deleteLoan(idloan, idfamily))

    }
}
const CListLoans = connect(mapStateToProps, mapDispatchToProps)(ListLoans);
export default CListLoans;