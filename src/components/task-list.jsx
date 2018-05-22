import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {Link} from 'react-router-dom';

import {List, ListItem, Dialog, FlatButton, Divider} from 'material-ui';
import {ActionDelete} from 'material-ui/svg-icons';

import {infoMessage, successMessage, errorMessage, closeMessage} from '../services/message';

import {WATERING_AREAS} from '../config';

const nameArea = (value) => WATERING_AREAS.find(item => item.value === value).name;

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
        const {_id, name, time, area, timeOn, active, onRemove} = this.props;
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
                <Link to={`/task/${_id}`} title={_id}>
                    <ListItem rightIcon={<ActionDelete onClick={this.onRemove}/>}>
                        <div>{name}</div>
                        <sub>
                            <small> {nameArea(area)}  {timeOn} ({time} мин.)</small>
                        </sub>

                    </ListItem>
                </Link>
            </div>

        )
    }
}

@inject("tasks")
@observer
export default class TaskList extends Component {

    onRemove = (id) => {
        id && this.props.tasks.remove(id)
            .then(() => successMessage('Задача удалена...'))
            //.then(() => closeMessage())
            .catch(err => errorMessage(err))
    }

    componentWillMount() {
        //infoMessage('Запрос списка задач...')
        this.props.tasks.fetch()
        //.then(data => successMessage(`Всего задач: ${data.length}`))
            .then(data => closeMessage())
            .catch(err => errorMessage(err));

    }

    render() {
        const {tasks} = this.props;
        const items = tasks.toJSON().map(item => <Item key={item._id} {...item} onRemove={this.onRemove}/>);
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