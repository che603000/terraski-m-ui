import {observable, computed, action, toJS, autorun, reaction} from 'mobx';
import * as taskFetch from "../services/fetch";
import {tasks} from "./index";

export default class Task {

    _undoState = null;

    @observable
    isSave = true;

    @observable
    isLoading = false;

    @computed
    get isNew() {
        return !this._id;
    }

    @observable
    _id = undefined

    @observable
    active = true

    @observable
    area = 1

    @observable
    name = 'Новая задача'

    @observable
    temp = 10

    @observable
    timeOn = "06:00"

    @observable
    time = 10

    constructor(data = {}) {
        this.setProps(data, {isSave: true});
    }


    @action
    setProps(data, options = {}) {
        const {isSave = false} = options;
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                this[key] = data[key];
                this.isSave = isSave;
            }
        });
    }

    clone() {
        return new Task(this.toJSON());
    }

    toJSON() {
        const {isLoading, isSave, _undoState, __v, ...props} = toJS(this);
        return props;
    }

    fetch(id) {
        this.isLoading = true;
        const _id = id || this._id;
        if (_id)
            return taskFetch.item(_id)
                .then(item => this.setProps(item, {isSave: true}))
                .then(() => {
                    this.isSave = true;
                    this._undoState = null;
                })
                .finally(() => this.isLoading = false)
        else
            return Promise.resolve();
    }

    save() {
        this.isLoading = true;
        const method = this.isNew ? 'POST' : 'PUT';
        return taskFetch.save(this.toJSON(), {method})
            .then(item => this.setProps(item, {isSave: true}))
            .then(() => {
                this.isSave = true;
                this._undoState = null;
            })
            .finally(() => this.isLoading = false)
    }

    setUndo() {
        this._undoState = this.toJSON();
    }

    undo() {
        this.setProps(this._undoState, {isSave: true});
        this.isSave = true;
    }
}