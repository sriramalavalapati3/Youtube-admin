import { connect } from "react-redux";
import {mapDispatchToProps,mapStateToProps} from './Props'
import Navbar from './Navbar'


export default connect( mapStateToProps, mapDispatchToProps)(Navbar);