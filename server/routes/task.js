const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const ObjectId = mongoose.modelSchemas.ObjectId;

const Task = mongoose.model('task');

module.exports = (app) => {
    // list
    router.get('/tasks', (req, res, next) => {
        Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => next(err))
    });

    // get
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
        // Task.findByIdAndUpdate(body.id, body, {
        //     new: true
        // })
        Task.findById(body.id)
            .then(task => {
                if (task)
                    return task
                else
                    throw  new Error(`not fount task ${body.id}`)
            })
            .then(task => {
                Object.keys(body).forEach(key => task[key] = body[key]);
                return task;
            })
            .then(task => task.save())
            .then(task => req.json(task))
            .catch(err => next(err))
    });

    //remove
    router.delete('/task/:id', (req, res, next) => {
        const {id} = req.params;
        Task.remove({id: new ObjectId(id)})
            .then(task => res.end())
            .catch(err => next(err))
    });

    app.use('/api', router);
}
