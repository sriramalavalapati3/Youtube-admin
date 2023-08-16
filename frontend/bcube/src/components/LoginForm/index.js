import { connect } from "react-redux";
import {mapDispatchToProps,mapStateToProps} from './Props';

import LoginForm from './LoginForm'

export default connect( mapStateToProps, mapDispatchToProps)(LoginForm);