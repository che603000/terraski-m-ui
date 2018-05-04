import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {Link} from 'react-router-dom';

import {List, ListItem, Dialog, FlatButton, Snackbar, Divider} from 'material-ui';
import {ActionDelete} from 'material-ui/svg-icons';

import ModelTask from '../models/task';
import {CMD_TASK_REMOVE, CMD_TASK_SAVE, TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR} from '../const';


@observer
class Item extends Component {

    state = {
        open: false
    }

    onRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({open: true});
    }

    render() {
        const {id, name, onRemove} = this.props;
        const actions = [
            <FlatButton
                label="Нет"
                primary={true}
                onClick={() => this.setState({open: false})}
            />,
            <FlatButton
                label="Да"
                onClick={() => {
                    this.setState({open: false});
                    onRemove(id)
                }}
            />,
        ];
        return (
            <div>
                <Dialog
                    contentStyle={{width: '400px'}}
                    title="Удаление"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Задача будет удалена. Продолжать ?
                </Dialog>
                <Link key={id} to={`/task/${id}`}>
                    <ListItem primaryText={name} rightIcon={<ActionDelete onClick={this.onRemove}/>}/>
                </Link>
            </div>

        )
    }


}

@inject("tasks", "commands")
@observer
export default class TaskList extends Component {

    state = {
        open: false,
        message: "",
        type: TYPE_MESSAGE_SUCCESS
    }

    onRemove = (id) => {
        const {commands} = this.props;
        id && commands(CMD_TASK_REMOVE, {id})
            .then(() => {
                this.setState({
                    open: true,
                    message: "Задача успешно удалена.",
                    type: TYPE_MESSAGE_SUCCESS
                });
            });
    }

    componentWillMount() {
        const {tasks} = this.props;
        tasks.fetch()
    }

    renderWait() {
        return (
            <div>Loading...</div>
        )
    }

    render() {
        const {tasks} = this.props;
        const items = tasks.items.peek().map(t => <Item key={t.id} {...t} onRemove={this.onRemove}/>);

        if (tasks.isLoading)
            return this.renderWait();
        else
            return (
                <div>
                    <List>
                        {items}
                    </List>

                    <Divider/>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.message}
                        bodyStyle={{backgroundColor: this.state.type}}
                        autoHideDuration={4000}
                        onRequestClose={() => this.setState({open: false})}
                    />
                    <Link to={'/task'}>
                        <FlatButton label="Новая задача" fullWidth={true} labelPosition={"after"}/>
                    </Link>
                </div>
            );
    }
}