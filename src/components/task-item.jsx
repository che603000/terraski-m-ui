import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import {TextField, Switch as Toggle, Slide as Slider, Select, MenuItem, Button, Snackbar} from '@material-ui/core';

import {WATERING_AREAS} from '../config';
import {errorMessage} from '../services/message';
import ModelTask from '../models/task';


@observer
export default class TaskItem extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    isChange = false;

    constructor() {
        super(...arguments);
        this.task = new ModelTask();
    }

    onSave = () => {
        this.task.save()
            .then(() => this.onCancel(true))
            .catch(err => errorMessage(err))
    }

    onCancel = (isSave) => {
        !isSave && this.task.undo();

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
        const {match: {params: {id}}} = this.props;
        this.task.fetch(id).then(() => this.task.setUndo());
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
                    <Select
                        hintText={"Зоны полива"}
                        disabled={!active}
                        floatingLabelText="выберете зону для полива"
                        floatingLabelFixed={true}
                        value={area}
                        onChange={(e, value, payload) => this.onChange('area', payload)}
                    >
                        {WATERING_AREAS.map(item => <MenuItem key={item.value} value={item.value} primaryText={item.name}/>)}
                    </Select>
                    <br/>
                    <TextField
                        disabled={!active}
                        type={"time"}
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
                {/*<FlatButton label="Отменить" fullWidth={false} labelPosition={"after"} onClick={e => this.onCancel()}/>*/}
                {/*<FlatButton label="Сохранить" fullWidth={false} labelPosition={"after"} primary={true} onClick={e => this.onSave()}*/}
                />

            </div>
        );
    }
}