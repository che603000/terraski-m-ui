import {observer, inject} from 'mobx-react';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import {Divider, ListItem, Dialog, Button, IconButton, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {WATERING_AREAS} from '../config';

const nameArea = (value) => WATERING_AREAS.find(item => item.value === value).name;

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});


@withStyles(styles)
@inject("message")
export default class Item extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    }


    state = {
        open: false
    }

    onRemove = (e) => {
        const {message} = this.props;
        message.dialog({title: "Remove task ?", message: "test !!!"})
            .then(() => console.log("delete"))
            .catch(_ => console.log("cancel"))
    }

    render() {
        const {_id, name, time, area, timeOn, active, onRemove, classes} = this.props;
        return (
            <ListItem>
                <ListItemText>
                    <Link to={`/task/${_id}`} title={_id} className={"app-list-item"}>
                        <div>{name}</div>
                        <sub>
                            <small> {nameArea(area)} {timeOn} ({time} мин.)</small>
                        </sub>
                    </Link>
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments" onClick={this.onRemove}>
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>


            </ListItem>


        )
    }
}

