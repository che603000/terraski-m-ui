import React, {Component, PropTypes} from 'react';
import {Snackbar} from '@material-ui/core';
import {inject, observer} from "mobx-react/index";




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