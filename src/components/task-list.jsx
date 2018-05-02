import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {Link} from 'react-router-dom';

//import ModelTask from '../models/task';
import {List, ListItem, Dialog, FlatButton, Snackbar, Divider} from 'material-ui';
import {ActionDelete} from 'material-ui/svg-icons';

import {TASK_REMOVE} from '../commands/const';
//import Task from './page-watering-task';


@observer
class Item extends Component {

    state={
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
                onClick={() => {this.setState({open: false}); onRemove(id)}}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Удаление"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Задача будет удалена. Продолжать ?
                </Dialog>
                <Link key={id} to={`/tasks/${id}`}>
                    <ListItem primaryText={name} rightIcon={<ActionDelete onClick={this.onRemove}/>}/>
                </Link>
            </div>

        )
    }

    // return (
    //     <Row>
    //         <Col width={"10%"} onClick={() => onDelete(row)}>
    //             <Icon icon="md-delete" size={20}/>
    //         </Col>
    //         <Col width={"90%"} onClick={() => onSelect(row)}>
    //             <div className={row.active ? "app-task-active" : "app-task-disabled"}>
    //                 {row.name}
    //                 {/*<span> </span>*/}
    //                 {/*{row.active ? : null}*/}
    //             </div>
    //         </Col>
    //     </Row>
    // )

}

@inject("tasks", "commands")
@observer
export default class TaskList extends Component {

    state = {
        open: false,
        message: ""
    }

    // onNew = () => {
    //     const {commands, navigator} = this.props;
    //     const data = new ModelTask();
    //     const props = {data, commands, options: {isNew: true}};
    //     navigator.pushPage({component: Task, props});
    // }
    //

    onRemove = (id) => {
        const {commands} = this.props;
        id && commands(TASK_REMOVE, {id})
            .then(() => {
                this.setState({open: true, message: "Задача успешно удалена."});
            });

    }

    render() {
        const {tasks} = this.props;


        const items = tasks.peek().map(t => <Item key={t.id} {...t} onRemove={this.onRemove}/>);

        return (
            <div>

                <List>
                    {items}
                </List>

                <Divider />
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    bodyStyle={{backgroundColor: '#393'}}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({open: false})}
                />
                <FlatButton label="Новая задача" fullWidth={true} labelPosition={"after"}/>
            </div>
        );
    }
}