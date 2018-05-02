import React, {Component} from 'react';
import {Toolbar, Page, BackButton, List, ListItem, Switch, Select, Input, Range, BottomToolbar, Button} from 'react-onsenui';
import ons from 'onsenui';
import {observer} from 'mobx-react';
import {TASK_SAVE} from '../commands/const';

@observer
export default class Task extends Component {

    isChange = false

    // componentDidMount() {
    //     this.prevData = this.props.data;
    // }

    onBack = (e) => {
        if (this.isChange)
            ons.notification
                .confirm('Задача не сохранена. Сохранить ?', {title: "Предупреждение"})
                .then(isOk => {
                    if (isOk)
                        this.onSave();
                    else
                        this.props.navigator.popPage();
                });
        else
            this.props.navigator.popPage();
    }

    renderToolbar = () => {
        const {name = "No name"} = this.props;
        return (
            <Toolbar>
                <div className="left"><BackButton onClick={this.onBack}>Back</BackButton></div>
                <div className="center">{name}</div>
            </Toolbar>
        );
    }

    onChange = (name, value) => {
        const {data} = this.props;
        this.isChange = true;
        data.setProps({[name]: value})
        //data[name] = value;
        console.log(value);
    }

    onSave = () => {
        const {data, commands, navigator, options} = this.props;
        return commands(TASK_SAVE, data, options)
            .then(() => navigator.popPage());
    }

    createField =(data)=>{
        const {active = true, timeOn = "00:00", time = 10, name = "No name", temp = 10, area = "1"} = data;
        return [
            <ListItem key={"active"}>
                <div className="center">
                    Активация
                </div>
                <div className="right">
                    <Switch
                        checked={active}
                        //disabled={true}
                        onChange={(e) => this.onChange('active', e.target.checked)}
                    />
                </div>
            </ListItem>,
            <ListItem key={"area"}>
                <div className="center">
                    Участок
                </div>
                <div className="right">
                    <Select value={area.toString()}
                            disabled={!active}
                            onChange={(e) => this.onChange('area', e.target.value)}
                    >
                        <option value="1">зона 1</option>
                        <option value="2">зона 2</option>
                        <option value="3">зона 3</option>
                        <option value="4">зона 4</option>
                    </Select>
                </div>
            </ListItem>,
            <ListItem key={"name"}>
                <div className="center">
                    Название
                </div>
                <div className="right">
                    <Input
                        value={name}
                        onChange={(e) => this.onChange('name', e.target.value)}
                        disabled={!active}
                        modifier='underbar'
                        float
                        title='имя задачи'/>
                </div>
            </ListItem>,
            <ListItem key={"timeOn"}>
                <div className="center">
                    Включение (чч:мм)
                </div>
                <div className="right">
                    <Input
                        value={timeOn}
                        onChange={(e) => this.onChange('timeOn', e.target.value)}
                        disabled={!active}
                        type={"time"}
                        modifier='underbar'
                        float
                        title='время включения зоны'/>
                </div>
            </ListItem>,
            <ListItem key={"time"}>
                <div className="center">
                    Длительность <span className="app-label">{time}</span> мин
                </div>
                <div className="right">
                    <Range
                        value={time}
                        onChange={(e) => this.onChange('time', e.target.value)}
                        min={5}
                        max={60}
                        step={5}
                        type="number"
                        disabled={!active}
                        modifier='underbar'
                        float
                        title='время полива зоны'/>
                </div>
            </ListItem>,
            <ListItem key={"temp"}>
                <div className="center">
                    Темп более <span className="app-label">{temp}</span> °C
                </div>
                <div className="right">
                    <Range
                        value={temp}
                        onChange={(e) => this.onChange('temp', e.target.value)}
                        min={4}
                        max={50}
                        step={2}
                        type="number"
                        disabled={!active}
                        modifier='underbar'
                        float
                        title='мин температура активации'/>

                </div>
            </ListItem>
        ]
    }

    render() {
        const {data = {}} = this.props;
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List
                    dataSource={this.createField(data)}
                    renderRow={(row) => row}
                />
                <BottomToolbar modifier="material">
                    <Button
                        onClick={() => this.onSave(data)}
                        modifier='large--quiet'>Сохранить</Button>
                </BottomToolbar>
            </Page>
        )
    }
}


