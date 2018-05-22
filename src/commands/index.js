import {tasks, footer} from '../models/index';
import {CMD_TASK_SAVE, CMD_TASK_REMOVE, CMD_TASK_ITEM, CMD_TASK_LIST} from '../const';
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
        // case CMD_TASK_LIST: {
        //     infoMessage('Loading')
        //     return tasks.fetch()
        //         .then(() => closeMessage())
        //         .catch(err => errorMessage(err))
        // }

        case CMD_TASK_REMOVE: {
            const {id} = params;
            infoMessage('Remove wait...')
            return tasks.remove(id)
                .then(() => successMessage('Success remove...'))
                .catch(err => errorMessage(err))
        }
        case CMD_TASK_SAVE: {
            const task = params;
            const {undo} = options;
            infoMessage('Save...');
            return tasks.update(task)
                .then(() => successMessage('Success save...'))
                .catch(err => errorMessage(err))
        }
        default:
            throw new Error(`not found command name = ${command}`);
    }

}
