import Task from "../models/task";

const url ='/api/task';


export const appFetch = () => {
    return Promise.resolve();
}

export const save = (data, opt) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data),
        ...opt
    }
    return window.fetch(url, options)
        .then(res => {
            if (res.ok)
                return res.json();
            else {
                const {status, statusText} = res;
                throw {status, message: statusText};
            }
        });
};

export const list =() =>{
    return window.fetch(url)
        .then(res => {
            if (res.ok)
                return res.json();
            else
                throw new Error('error request')
        })
        .then(items => this.items = items.map(t => new Task(t)))
}

export const remove = (id) => window.fetch(`${url}/${id}`, {method: "DELETE"});

