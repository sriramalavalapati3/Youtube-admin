import { connect } from "react-redux";
import OverView from './OverView';
import {mapDispatchToProps,mapStateToProps} from './Props';
export default connect( mapStateToProps, mapDispatchToProps)(OverView);