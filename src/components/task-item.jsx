import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';

import {TextField, Toggle, Slider, SelectField, MenuItem, TimePicker, FlatButton, Snackbar} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import {CMD_TASK_SAVE, TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR} from '../const';
import ModelTask from '../models/task';


@inject((stores, props) => {
    const {match: {params: {id}}} = props;
    const {tasks, commands} = stores;
    const task = tasks.find(item => item.id === id);
    return {task, commands};
})
@observer
export default class TaskItem extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        open: false,
        message: "no message",
        type: TYPE_MESSAGE_SUCCESS
    }

    isChange = false;

    onSave = () => {
        const {commands} = this.props;
        commands(CMD_TASK_SAVE, this.task)
            .then(() => this.onCancel())
            .catch(err => this.setState({open: true, message: err.message, type: TYPE_MESSAGE_ERROR}));
    }

    onCancel = () => {
        const {router: {history}} = this.context;
        history.goBack();
    }

    onChange = (name, value) => {
        this.isChange = true;
        this.task.setProps({[name]: value});
    }

    onTime = (e, date) => {
        const minutes = date.getMinutes();
        const hours = date.getHours();
        this.onChange('timeOn', `${hours}:${minutes}`);
    }

    setTime(time) {
        const t = time.split(":")
        const date = new Date();
        date.setMinutes(+t[1]);
        date.setHours(+t[0]);
        return date;
    }

    componentWillMount() {
        this.task = this.props.task ? this.props.task.clone() : new ModelTask();
    }

    render() {
        const fieldSliderStyle = {
            width: '256px',
            fontFamily: 'Roboto, sans-serif',
            opacity: 1,
            color: 'rgba(0, 0, 0, 0.3)'
        }
        const {active, timeOn, time, name, temp, area} = this.task;
        return (
            <div>
                <div style={{marginLeft: '10px'}}>
                    <br/>
                    <Toggle
                        label="Активна"
                        toggled={active}
                        onToggle={(e, value) => this.onChange('active', value)}
                        style={{width: '256px'}}
                    />
                    <br/>
                    <TextField
                        hintText="Название задачи"
                        disabled={!active}
                        value={name}
                        onChange={(e, value) => this.onChange('name', value)}
                    />
                    <br/>
                    <SelectField
                        hintText={"Зоны полива"}
                        disabled={!active}
                        floatingLabelText="выберете зону для полива"
                        floatingLabelFixed={true}
                        value={area}
                        onChange={(e, value, payload) => this.onChange('area', payload)}
                    >
                        <MenuItem value={1} primaryText="Большой газон"/>
                        <MenuItem value={2} primaryText="Малый газон"/>
                        <MenuItem value={3} primaryText="Розы у забора"/>
                        <MenuItem value={4} primaryText="Перед домом"/>
                        <MenuItem value={5} primaryText="За забором"/>
                    </SelectField>
                    <br/>
                    <TimePicker
                        disabled={!active}
                        format="24hr"
                        floatingLabelText="Время начала полива"
                        floatingLabelFixed={true}
                        hintText="установите время"
                        minutesStep={5}
                        dialogStyle={{margin: '-50 auto'}}
                        value={this.setTime(timeOn)}
                        onChange={this.onTime}
                    />
                    <br/>
                    <div style={fieldSliderStyle}>
                        <div>Длительность полива: <span>{time}</span> мин</div>
                        <Slider
                            disabled={!active}
                            min={5}
                            max={60}
                            step={5}
                            onChange={(e, value) => this.onChange('time', value)}
                            value={time}
                        />
                    </div>
                    <div style={fieldSliderStyle}>
                        <div>Мин. температура: {temp} С</div>
                        <Slider
                            disabled={!active}
                            min={0}
                            max={50}
                            step={1}
                            onChange={(e, value) => this.onChange('temp', value)}
                            value={temp}
                        />

                    </div>
                </div>
                <FlatButton label="Отменить" fullWidth={false} labelPosition={"after"} onClick={this.onCancel}/>
                <FlatButton label="Сохранить" fullWidth={false} labelPosition={"after"} primary={true} onClick={this.onSave}/>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    bodyStyle={{backgroundColor: this.state.type}}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({open: false})}
                />
            </div>
        );
    }
}