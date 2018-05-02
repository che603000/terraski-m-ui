import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
// import {TASK_REMOVE} from '../commands/const';
// import {Link} from 'react-router-dom';
//
// import ModelTask from '../models/task';
import {List, ListItem, TextField, Toggle, Slider, SelectField, MenuItem, TimePicker, FlatButton, Badge} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;

@inject((stores, props) => {
    const {match: {params: {id}}} = props;
    const {tasks} = stores;
    const task = tasks.find(item => item.id === id);
    return {task};
})
@observer
export default class TaskItem extends Component {

    isChange = false;

    onChange = (name, value) => {
        const {task} = this.props;
        this.isChange = true;
        task.setProps({[name]: value})
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

    render() {
        const {match: {params: {id}}, task} = this.props;

        const fieldSliderStyle = {
            width: '256px',
            fontFamily: 'Roboto, sans-serif',
            opacity: 1,
            color: 'rgba(0, 0, 0, 0.3)'
        }
        const {active = true, timeOn = "00:00", time = 10, name = "No name", temp = 10, area = "1"} = task || {};
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
                <FlatButton label="Отменить" fullWidth={false} labelPosition={"after"}/>
                <FlatButton label="Сохранить" fullWidth={false} labelPosition={"after"} primary={true}/>

            </div>
        );
    }
}