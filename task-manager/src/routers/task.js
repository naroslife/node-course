const express = require('express');
const mongoose = require('mongoose');
require('../db/mongoose');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// app.post('/tasks', (req, res) => {
//   const task = new Task(req.body)
//   task
//     .save()
//     .then(() => {
//       return res.status(201).send(task)
//     })
//     .catch((err) => {
//       return res.status(400).send(err)
//     })
// })

// New with async/await
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    // task.owner = req.user._id

    const task = new Task({ ...req.body, owner: req.user._id });
    try {
        await task.save();
        return res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// app.get('/tasks', (req, res) => {
//   Task.find({})
//     .then((tasks) => {
//       res.send(tasks)
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     })
// })

// New with async/await
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    if (req.query.completed) {
        match.completed = req.query.completed.toLowerCase() === 'true';
    }

    const sort = {};
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }
    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit), // NaN is ignored
                skip: parseInt(req.query.skip), // NaN is ignored
                sort,
            },
        });
        res.send(req.user.tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

// app.get('/tasks/:id', (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(404).send()
//   }
//   Task.findById(req.params.id)
//     .then((task) => {
//       if (!task) {
//         return res.status(404).send()
//       }
//       return res.send(task)
//     })
//     .catch((err) => {
//       return res.status(500).send(err)
//     })
// })

// New with async/await
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(404).send();
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(404).send();
    }
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' });

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) return res.status(404).send();
        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();

        //This doesnt run the save middleware
        // const task = await Task.findByIdAndUpdate(_id, req.body, {
        //   new: true,
        //   runValidators: true,
        // })
        res.send(task);
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError')
            return res.status(400).send(error);
        return res.status(500).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(404).send();
    }
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) return res.status(404).send();
        return res.send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
