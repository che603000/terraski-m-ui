import {observable, action} from 'mobx';
import Task from './task';

class Tasks {
    @observable
    items = [];

    @observable
    isLoading = false;

    @action
    fetch() {
        this.isLoading = true;
        window.fetch('/api/tasks')
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error('error request')
            })
            .then(items => this.items = items.map(t => new Task(t)))
            .catch(err => console.log(err))
            .finally(() => this.isLoading = false);
    }
};

export const tasks= new Tasks();

/*
export const tasks = observable([
    new Task({
        id: "111",
        area: 1,
        name: 'Зона 1. Утро',
        active: true,
        temp: 15,
        timeOn: "06:00",
        time: 20,
    }),
    new Task({
        id: '222',
        area: 2,
        name: 'Зона 2. Утро',
        active: false,
        temp: 10,
        timeOn: "06:20",
        time: 10,
    })
])*/;