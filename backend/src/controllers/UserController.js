const User = require("../models/User");

module.exports = {
    async index(req, res){
        const users = await User.findAll();

        return res.json(users);
    },
    async getUser(req, res){
        const { id } = req.params;

        const user = await User.findOne({ where: { id }});

        if(!user) return res.status(401).send("User not found");

        return res.json(user);
    },
    async currentUser(req,res){
        const id = req.id;

        const user = await User.findOne({ where: { id }});

        return res.json(user);
    },
    async store(req, res){
        const { name, email, cnpj, password } = req.body;
        console.log(req.body)

        const user = await User.create({ name, email, cnpj, password });

        return res.json(user);
    },
    async update(req, res){
        const { id } = req.params;
        const { email, password } = req.body;

        const user = await User.findOne({ where: { id }});
        
        if(!user) return res.status(401).send("User not found");

        user.update({ email, password });
        user.save();

        return res.json(user);
    },
    async delete(req, res){
        const { id } = req.params;
        
        const user = await User.findOne({ where: { id }});

        if(!user) return res.status(401).send("User not found");
        
        user.destroy();

        return res(`User ${id} deleted`);
    }
}