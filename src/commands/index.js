import {tasks} from '../models/index';
import {appFetch} from '../services/fetch';
import {TASK_SAVE, TASK_REMOVE} from './const';


export default (command, params, options = {}) => {
    switch (command) {
        case TASK_REMOVE: {
            const {id} = params;
            return appFetch({data: {id}})
                .then(() => {
                    const item = tasks.find(f => f.id === id);
                    item && tasks.remove(item);
                });
        }
        case TASK_SAVE: {
            const {isNew = false} = options;
            return appFetch({data: params})
                .then(() => {
                    if (isNew)
                        tasks.push(params);
                    else {
                        const item = tasks.find(task => task.id === params.id);
                        item && item.setProps(params.toJSON());
                    }
                });
        }
        default:
            throw new Error(`not found command name = ${command}`);
    }

}
