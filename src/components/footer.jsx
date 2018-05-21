import React, {Component, PropTypes} from 'react';
import {Snackbar} from 'material-ui';
import {CMD_TASK_REMOVE, CMD_TASK_LIST, TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR} from '../const';
import {inject, observer} from "mobx-react/index";
//import IconButton from 'material-ui/IconButton';
//import FontIcon from 'material-ui/FontIcon';


@inject("footer")
@observer
export default class Footer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    onClose = () => {
        const {footer} = this.props;
        footer.open = false;
    }

    render() {
        //console.log(this);
        const {footer: {open, message, type, autoHide}} = this.props;
        return (
            <Snackbar
                open={open}
                message={message}
                bodyStyle={{backgroundColor: type}}
                autoHideDuration={autoHide}
                onRequestClose={this.onClose}
            />
        )
    }
}