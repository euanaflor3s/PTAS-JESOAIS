const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();

const createUser = async (req, res) => {
    const { name, password, email } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    await User.create({
       name: name,
       password: newPassword,
       email: email


    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso!');
        console.log('Cadastro do usúario realizado com sucesso!');
    }).catch((erro) => {
        res.json('Deu erro');
        console.log(`Deu erro: ${erro}`);
    })
}
const findUsers = async (req, res) => {
    const users = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.json("Usuário deletado com sucesso");
        })
    } catch (error) {
        res.status(404).json("Deu erro");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, password, email  } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    try {
        await User.update(
            {
                name: name,
                password: newPassword,
                email: email
               
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Usuário alterado");
        })
    } catch (error) {
        res.status(404).json("Deu erro!");
    }
}
const authenticatedUser = async (req, res) => {
    const {email, password } = req.body;
    
    try {
        const isUserAuthenticated = await User.findOne({
            where: { email } });

        if(!isUserAuthenticated){
            return res.jso("não encontrado");
        }
        const isPasswordValidated = await bcrypt.compare(password, isUserAuthenticated.password);
        if(isPasswordValidated){
            const token = jwt.sign({ id: email }, process.env.SECRET, { expiresIn: 86400 });
            
            return res.cookie('token', token, { httpOnly: true}).json({
                    name: isUserAuthenticated.name,
                    email: isUserAuthenticated.email,
                    token: token
                });
        }
        
        
    } catch (error) {
        return res.json("Usuário não encontrado");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
