const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM 2019Spring_Persons");   
    },
    async get(id){
        const data = await conn.query("SELECT * FROM 2019Spring_Persons WHERE Id=?", id);
        if(!data){
            throw Error("User not found");
        }
        return data[0];
    },
    async add(input){
        if(!input.Password){
            throw Error('Password is Required');
        }
        if(input.Password.length < 8){
            throw Error('A longer Password is Required');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO 2019Spring_Persons (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
            [[input.FirstName, input.LastName, input.Birthday, hashedPassword, new Date()]] 
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async login(email, password){
        //console.log({ email, password })
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].Password);
        if(x){
            const user = { ...data[0], password: null };
            return { user, token: jwt.sign(user, JWT_SECRET) };
        }else{
            throw Error('Wrong Password');
        }
    },
    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update 2019Spring_Persons P
                            Set ?
                        WHERE P.id=?`,[ {Password: hashedPassword }, data[0].id]);
            return { status: "success", msg: "Password Succesfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }
};

module.exports = model;