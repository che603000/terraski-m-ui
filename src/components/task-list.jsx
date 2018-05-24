import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';

import {List,  Divider} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import {infoMessage, successMessage, errorMessage, closeMessage} from '../services/message';
import Item from './task-list-item';

const styles = theme => ({
    // button: {
    //     margin: theme.spacing.unit,
    // },
    // input: {
    //     display: 'none',
    // },
    // fab: {
    //     // position: 'absolute',
    //     // bottom: theme.spacing.unit * 2 + 100,
    //     // right: theme.spacing.unit * 2,
    // },
});


//@withStyles(styles, {withTheme: true})
@inject("tasks", "appTools")
@observer
export default class TaskList extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    // static propTypes ={
    //     theme: PropTypes.object.isRequired,
    //     classes: PropTypes.object.isRequired
    // }

    tools = [
        {
            id: 'newTask',
            icon: AddIcon,
            props: {
                title: 'Новая задача',
                //onClick: () => alert('add !!!'),
                component: Link,
                to: '/task'
            }
        }
    ]

    onRemove = (id) => {
        id && this.props.tasks.remove(id)
            .then(() => successMessage('Задача удалена...'))
            //.then(() => closeMessage())
            .catch(err => errorMessage(err))
    }


    componentWillMount() {
        const {tasks, appTools} = this.props;
        appTools.replace(this.tools);
        tasks.fetch()
            .then(data => closeMessage())
            .catch(err => errorMessage(err));

    }

    componentWillUnmount() {
        const {tasks, appTools} = this.props;

        appTools.clear();
    }

    render() {
        const {tasks} = this.props;
        const items = tasks.toJSON().map(item => <Item key={item._id} {...item} onRemove={this.onRemove}/>);

        return (
            <List>
                {items}
                <li>
                    <Divider/>
                </li>
            </List>
        );
    }
}