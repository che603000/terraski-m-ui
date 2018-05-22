import {footer} from '../models/index';
import {TYPE_MESSAGE_SUCCESS, TYPE_MESSAGE_ERROR, TYPE_MESSAGE_INFO} from '../const';


export const infoMessage = (message) => {
    footer.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_INFO
    })
};

export const successMessage = (message) => {
    footer.setProps({
        open: true,
        message,
        type: TYPE_MESSAGE_SUCCESS,
        autoHide: 3000
    })
};

export const errorMessage = (err) => {
    footer.setProps({
        open: true,
        message: `${err.status} ${err.message}`,
        type: TYPE_MESSAGE_ERROR,
        //autoHide: 5000
    })
}

export const closeMessage = (message) => {
    footer.setProps({
        open: false
    })
}



