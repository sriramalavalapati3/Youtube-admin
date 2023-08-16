import { connect } from "react-redux";

import {mapDispatchToProps,mapStateToProps} from './Props'
import UploadForm from './UploadForm'

export default connect( mapStateToProps, mapDispatchToProps)(UploadForm);