import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {Link} from 'react-router-dom';

import {List, ListItem, Dialog, FlatButton,  Divider} from 'material-ui';
import {ActionDelete} from 'material-ui/svg-icons';

import ModelTask from '../models/task';
import {CMD_TASK_REMOVE} from '../const';


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
        const {_id, name, onRemove} = this.props;
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
                    onRemove(_id)
                }}
            />,
        ];
        return (
            <div>
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
                <Link to={`/task/${_id}`}  title={_id}>
                    <ListItem primaryText={`${name}`} rightIcon={<ActionDelete onClick={this.onRemove}/>}/>
                </Link>
            </div>

        )
    }
}

@inject("tasks", "commands")
@observer
export default class TaskList extends Component {

    onRemove = (id) => {
        const {commands} = this.props;
        id && commands(CMD_TASK_REMOVE, {id})
    }

    renderWait() {
        return (
            <div>Loading...</div>
        )
    }

    render() {
        const {tasks} = this.props;
        const items = tasks.items.peek().map(item => <Item key={item._id} {...item} onRemove={this.onRemove}/>);

            return (
                <div>
                    <List>
                        {items}
                    </List>

                    <Divider/>

                    <Link to={'/task'}>
                        <FlatButton label="Новая задача" fullWidth={true} labelPosition={"after"}/>
                    </Link>
                </div>
            );
    }
}