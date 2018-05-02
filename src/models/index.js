import {observable} from 'mobx';
import Task from './task';

export const tasks = observable([
    new Task({
        id:"111",
        area: 1,
        name: 'Зона 1. Утро',
        active: true,
        temp: 15,
        timeOn: "06:00",
        time: 20,
    }),
    new Task({
        id:'222',
        area: 2,
        name: 'Зона 2. Утро',
        active: false,
        temp: 10,
        timeOn: "06:20",
        time: 10,
    })
]);