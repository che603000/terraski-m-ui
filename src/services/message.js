import {message} from '../models/index';
import {TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR, TYPE_MESSAGE_INFO} from '../const';


export const infoMessage = (message) => {
    message.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_INFO
    })
};

export const successMessage = (message) => {
    message.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_SUCCESS,
        autoHide: 3000
    })
};

export const errorMessage = (err) => {
    message.setProps({
        open: true,
        message: `${err.status} ${err.message}`,
        type: TYPE_MESSAGE_ERROR,
        //autoHide: 5000
    })
}

export const closeMessage = (message) => {
    message.setProps({
        open: false
    })
}



