const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Task = mongoose.model('task');

module.exports = (app) => {
    // get list
    router.get('/task', (req, res, next) => {

        Task.find()
            .then(tasks => {
                //setTimeout(()=>{
                res.json(tasks)
                //}, 2000)

            })
            .catch(err => next(err))
    });

    // get item
    router.get('/task/:id', (req, res, next) => {
        const {id} = req.params;
        Task.findById(id)
            .then(task => res.json(task))
            .catch(err => next(err))
    });

    // add
    router.post('/task', (req, res, next) => {
        const {body} = req;
        Task.create(body)
            .then(task => res.json(task))
            .catch(err => next(err))
    });

    // edit
    router.put('/task', (req, res, next) => {
        const {body} = req;
        Task.findById(body._id)
            .then(task => {
                if (task)
                    return task;
                else
                    throw  new Error(`not fount task ${body._id}`);
            })
            .then(task => {
                Object.keys(body).forEach(key => task[key] = body[key]);
                return task;
            })
            .then(task => task.save())
            .then(task => res.json(task))
            .catch(err => next(err))
    });

    //remove
    router.delete('/task/:id', (req, res, next) => {
        const {id} = req.params;
        Task.findById(id)
            .remove()
            .then(task => res.end())
            .catch(err => next(err))
    });

    app.use('/api', router);
}
