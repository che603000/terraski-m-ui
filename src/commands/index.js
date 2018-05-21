import {tasks, footer} from '../models/index';
import * as taskFetch from '../services/fetch';
import {CMD_TASK_SAVE, CMD_TASK_REMOVE, CMD_TASK_ADD, CMD_TASK_LIST} from '../const';
import {TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR, TYPE_MESSAGE_INFO} from '../const';


const infoMessage = (message) => {
    footer.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_INFO
    })
};

const successMessage = (message) => {
    footer.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_SUCCESS,
        autoHide: 3000
    })
};

const errorMessage = (err) => {
    footer.setProps({
        open: true,
        message: `${err.status} ${err.message}`,
        type: TYPE_MESSAGE_ERROR,
        //autoHide: 5000
    })
}

const closeMessage = (message) => {
    footer.setProps({
        open: false
    })
}


export default (command, params, options = {}) => {
    switch (command) {
        case CMD_TASK_LIST: {
            infoMessage('Loading')
            return taskFetch.list()
                .then(items => tasks.setItems(items))
                .then(() => closeMessage())
                .catch(err=>errorMessage(err))
        }
        case CMD_TASK_REMOVE: {
            const {id} = params;
            infoMessage('Remove wait...')
            return taskFetch.remove(id)
                .then(() => {
                    const item = tasks.items.find(f => f._id === id);
                    item && tasks.items.remove(item);
                })
                .then(() => successMessage('Success remove...'))
                .catch(err=>errorMessage(err))
        }
        case CMD_TASK_SAVE: {
            const task = params;
            const method = task.isNew ? 'POST' : 'PUT';

            infoMessage('Save...');
            return taskFetch.save({...task}, {method})
                .then(data => {
                    if (task.isNew)
                        tasks.items.push(data);
                    else {
                        const item = tasks.items.find(t => t.id === params.id);
                        item && item.setProps(task.toJSON());
                    }
                })
                .then(() => successMessage('Success save...'))
                .catch(err=>errorMessage(err))
        }
        default:
            throw new Error(`not found command name = ${command}`);
    }

}
