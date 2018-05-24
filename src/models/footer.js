import {observable, action} from 'mobx';
import Task from './task';

export default class Footer {
    @observable
    open = false;

    @observable
    type = 'initialize';

    @observable
    message = '';

    @observable
    autoHide = 0;

    @action
    setProps(data) {
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined)
                this[key] = data[key];
        });
    }

}


