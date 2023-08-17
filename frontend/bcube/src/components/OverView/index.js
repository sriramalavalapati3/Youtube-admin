import { connect } from "react-redux";
import {mapDispatchToProps,mapStateToProps} from './Props'
import OverView from './OverView';


export default connect( mapStateToProps, mapDispatchToProps)(OverView);