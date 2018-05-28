import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import {TextField, Switch, Slide as Slider, Select, MenuItem, Button, Snackbar, FormGroup, FormControlLabel, FormControl, FormLabel, InputLabel} from '@material-ui/core';

import {WATERING_AREAS} from '../config';
import {errorMessage} from '../services/message';
import ModelTask from '../models/task';
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

@inject("appTools")
@observer
export default class TaskItem extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    tools = [
        {
            id: 'saveTask',
            icon: SaveIcon,
            props: {
                title: 'Сохранить задача',
                onClick: () => this.onSave()
            }
        },
        {
            id: 'cancelTask',
            icon: CancelIcon,
            props: {
                title: 'Отменить',
                onClick: () => this.onCancel(),
            }
        }
    ];

    isChange = false;

    constructor() {
        super(...arguments);
        this.task = new ModelTask();
    }

    onSave = () => {
        this.task.save()
            .then(() => this.onCancel())
            .catch(err => errorMessage(err))
    }

    onCancel = () => {
        const {router: {history}} = this.context;
        history.push('/tasks');
    }

    onChange = (name, value) => {
        this.isChange = true;
        this.task.setProps({[name]: value});
    }

    componentWillMount() {
        const {match: {params: {id}}, appTools} = this.props;
        this.task.fetch(id)
            .then(() => appTools.replace(this.tools))
    }

    componentWillUnmount() {
        const {appTools} = this.props;
        appTools.clear();
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
            <FormControl component="fieldset" style={{marginLeft: '25px'}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={active}
                            onChange={e => this.onChange('active', e.target.checked)}
                        />
                    }
                    label="активность задачи"
                />
                <TextField
                    label="Название задачи"
                    value={name}
                    fullWidth={true}
                    disabled={!active}
                    onChange={e => this.onChange('name', e.target.value)}
                    margin="normal"
                />
                <FormControl>
                    <InputLabel>Зоны полива</InputLabel>
                    <Select
                        disabled={!active}
                        value={area}
                        onChange={e => this.onChange('area', e.target.value)}
                        label="Зоны полива"
                    >
                        {WATERING_AREAS.map(item => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    label="Время начала полива"
                    type="time"
                    disabled={!active}
                    value={timeOn}
                    onChange={e => this.onChange('timeOn', e.target.value)}
                    margin="normal"
                />
                <br/>
                <FormControl>
                    <InputLabel>Длительность полива</InputLabel>
                    <Select
                        disabled={!active}
                        value={time}
                        onChange={e => this.onChange('time', e.target.value)}
                    >
                        {[5, 10, 15, 20, 25, 30].map(m => <MenuItem key={m} value={m}>{m} минут</MenuItem>)}

                    </Select>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel>Мин. температура</InputLabel>
                    <Select
                        disabled={!active}
                        value={temp}
                        onChange={e => this.onChange('temp', e.target.value)}
                    >
                        {[0, 5, 10, 15, 20, 25, 30].map(m => <MenuItem key={m} value={m}>{m} градусов</MenuItem>)}

                    </Select>
                </FormControl>
                <br/>
            </FormControl>
        );
    }
}