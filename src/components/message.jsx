import {inject, observer} from "mobx-react/index";

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {TYPE_MESSAGE_DIALOG, TYPE_MESSAGE_ALERT} from '../const';

class AlertDialog extends React.Component {
    state = {
        open: true,
    };


    handleClose = (value) => {
        this.props.onClose(value);
        //this.setState({open: false});
    };

    render() {
        const {title, message, open} = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={e => this.handleClose(false)} color="primary">
                            Отменить
                        </Button>
                        <Button onClick={e => this.handleClose(true)} color="primary" autoFocus>
                            Ок
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

@inject("message")
@observer
export default class Message extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    onClose = (value) => {
        const {message} = this.props;
        message.setProps({_answer: value, open: false, type: null});
    }

    render() {
        //console.log(this);
        const {message: {open, message = "", type, title = "???", autoHide}} = this.props;
        switch (type) {
            case TYPE_MESSAGE_ALERT:
                return "";
            case TYPE_MESSAGE_DIALOG:
                return (<AlertDialog {...{message, title, open}} onClose={this.onClose}/>)
            default:
                return <div/>;
        }
        // return (
        //     <Snackbar
        //         open={open}
        //         message={message}
        //         bodyStyle={{backgroundColor: type}}
        //         autoHideDuration={autoHide}
        //         onRequestClose={this.onClose}
        //     />
        // )
    }
}