import { connect } from "react-redux";
import {mapDispatchToProps,mapStateToProps} from './Props';
import { withNavigateHook } from "../Navigate";
import {LoginForm} from './LoginForm'

export default connect( mapStateToProps, mapDispatchToProps)( withNavigateHook(LoginForm));