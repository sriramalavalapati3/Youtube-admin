import { connect } from "react-redux";
import { mapStateToProps } from './Props';
import {Sidebar} from './Sidebar'

export default connect(mapStateToProps)(Sidebar)