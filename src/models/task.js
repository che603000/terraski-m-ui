import {observable, computed, action, toJS} from 'mobx';

export default class Task {

    @computed
    get isNew(){
        return !this.id;
    }

    @observable
    id = undefined

    @observable
    active = true

    @observable
    area = 1

    @observable
    name = 'Новая задача'

    @observable
    active = false

    @observable
    temp = 10

    @observable
    timeOn = "06:00"

    @observable
    time = 10

    constructor(data = {}) {
        this.setProps(data);
    }

    @action
    setProps(data) {
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined)
                this[key] = data[key];
        });
    }

    clone() {
        return new Task(this.toJSON());
    }

    toJSON() {
        return toJS(this);
    }
}