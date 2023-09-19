//Take the model of the task
const Task = require('../models/Task')

//Here we will have all the operations
module.exports = {

    //gaseste toate tascurile asincron
    getAllTasks: async (req, res) => {
        //gaseste toate taskurile
        const tasks = await Task.find({})
        //randeaza pagina si trimite taskurile gasite
        res.render('index', { tasks })
    },

    //adauga un nou task
    createTask: async (req, res) => {
        //datele se iau din body-ul requestului
        const title = req.body.title
        const description = req.body.description

        //Se creaza taskul cu ce s-a luat din body
        await Task.create({ title, description });
        res.redirect('/')
    },

    //Arata un task dupa id
    getTaskById: async (req, res) => {
        //id-ul se ia din parametrii din link
        const taskId = req.params.id
        //se cauta obiectul dupa acel id
        const task = await Task.findById(taskId)
        //se randeaza pagina si se trimite obiectul gasit
        res.render('show', { task })
    },

    updateTask: async (req, res) => {
        const title = req.body.title
        const description = req.body.description

        await Task.findByIdAndUpdate(req.params.id, { title, description })

        res.redirect(`/tasks/${req.params.id}`);
    },

    deleteTask: async (req, res) => {
        await Task.findByIdAndRemove(req.params.id)
        res.redirect('/');
    }


}