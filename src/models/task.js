import {observable, action, toJS} from 'mobx';

export default class Task {

    id = (Math.random() * 10e8 | 0).toString();

    @observable
    active = true

    @observable
    area = "1"

    @observable
    name = 'Зона 2. Утро'

    @observable
    active = false

    @observable
    temp = 10

    @observable
    timeOn = "06:20"

    @observable
    time = 5

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