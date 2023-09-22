db = require('../database')

exports.insert = async (req,res) => {

    const user = await db.user.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        name: req.body.name
    });

    res.json(user);
}

exports.update = async (req,res) => {}

exports.delete = async (req,res) => {}

exports.select = async (req,res) => {
    const id = req.params.id
    const user = await db.user.findByPk(id);
    res.json(user)
}