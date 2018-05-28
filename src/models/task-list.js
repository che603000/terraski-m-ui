import {observable, action, toJS} from 'mobx';
import Task from './task';
import * as taskFetch from "../services/fetch";
import {tasks} from "./index";

export default class Tasks {
    @observable
    items = [];

    @observable
    isLoading = false;

    @action
    setItems(items) {
        this.items.replace(items.map(item => this.createModel(item)));
    }

    @action
    fetch() {
        this.isLoading = true;
        return taskFetch.list()
            .then(items => {
                this.setItems(items);
                return items;
            })
            //.finally(() => this.isLoading = false)
    }

    @action
    remove(id) {
        return taskFetch.remove(id)
            .then(() => {
                const item = this.item(id);
                this.items.remove(item);
            })
            //.finally(() => this.isLoading = false)

    }

    toJSON() {
        return this.items.map(item => item.toJSON());
    }

    item(id) {
        return this.items.find(item => item._id === id);
    }

    update(item) {
        const task = this.createModel(item);
        const isNew = task.isNew;

        return task.save()
            .then(data => {
                if (isNew)
                    this.items.push(task)
                return task;
            })
    }

    createModel(item) {
       return  item instanceof Task ? item : new Task(item);
    }
}

