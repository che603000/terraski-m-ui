import {observable, action} from 'mobx';
import Task from './task';

export  default class Tasks {
    @observable
    items = [];

    @observable
    isLoading = false;

    @action
    setItems(items) {
        this.items = items.map(t => new Task(t));
    }
}

