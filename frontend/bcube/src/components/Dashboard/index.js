
import Dashboard from './Dashboard'
import { connect } from "react-redux";
import {mapDispatchToProps,mapStateToProps} from './Props'


export default connect( mapStateToProps, mapDispatchToProps)(Dashboard);