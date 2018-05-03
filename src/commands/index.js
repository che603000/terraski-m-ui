import {tasks} from '../models/index';
import {appFetch} from '../services/fetch';
import {CMD_TASK_SAVE, CMD_TASK_REMOVE} from '../const';


export default (command, params, options = {}) => {
    switch (command) {
        case CMD_TASK_REMOVE: {
            const {id} = params;
            return appFetch({data: {id}})
                .then(() => {
                    const item = tasks.find(f => f.id === id);
                    item && tasks.remove(item);
                });
        }
        case CMD_TASK_SAVE: {
            const task = params;

            return appFetch({data: task})
                .then(() => {
                    if (task.isNew)
                        tasks.push(task);
                    else {
                        const item = tasks.find(t => t.id === params.id);
                        item && item.setProps(task.toJSON());
                    }
                });
        }
        default:
            throw new Error(`not found command name = ${command}`);
    }

}
