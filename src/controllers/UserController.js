const User = require("../models/User");

module.exports = {
    async store(req, res){
        const { name, email, cnpj, password } = req.body;

        const user = await User.create({ name, email, cnpj, password });

        return res.json(user);
    }
}