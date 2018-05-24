import React, {Component, PropTypes} from 'react';
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
export default class Item extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    }


    state = {
        open: false
    }

    onRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({open: true});
    }

    render() {
        const {_id, name, time, area, timeOn, active, onRemove, classes} = this.props;
        const actions = [
            <Button
                label="Нет"
                primary={true}
                onClick={() => this.setState({open: false})}
            />,
            <Button
                label="Да"
                onClick={() => {
                    this.setState({open: false});
                    onRemove(_id)
                }}
            />,
        ];
        return (
            <ListItem>
                <Dialog
                    contentStyle={{width: '300px'}}
                    title="Удаление"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <h4>"{name}"</h4>

                    будет удалена. Продолжать ?
                </Dialog>
                <Link to={`/task/${_id}`} title={_id} className={"app-list-item"}>

                    <ListItemText>
                        <div>{name}</div>
                        <sub>
                            <small> {nameArea(area)} {timeOn} ({time} мин.)</small>
                        </sub>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments">
                            <Delete/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </Link>

            </ListItem>


        )
    }
}

