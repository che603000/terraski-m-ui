import {observable, action, autorun} from 'mobx';
import {TYPE_MESSAGE_DIALOG} from '../const'

export default class Message {

    @observable
    _answer = null;

    @observable
    open = false;

    @observable
    type = 'initialize';

    @observable
    title = '';

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

    dialog(options) {
        this.setProps({...options, open: true, type: TYPE_MESSAGE_DIALOG});
        return new Promise(this._setAnswer.bind(this));
    }


    _setAnswer(res, rej) {
        const _clear = autorun(() => {
            if (!this.open) {
                _clear();
                if (this._answer)
                    res();
                else
                    rej();
            }
        })
    }
}


