const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 8;

const model = {
    getAll(cb){
        conn.query("SELECT * FROM 2019Spring_Persons", (err, data) => {
            cb(err, data);
        });    
    },
    get(id, cb){
        conn.query("SELECT * FROM 2019Spring_Persons WHERE Id=?", id, (err, data) => {
            cb(err, data[0]);
        });    
    },
    add(input, cb){
        if(input.Password.length < 8){
            cb(Error('A longer Password is Required'));
            return;
        }
        bcrypt.hash(input.Password, SALT_ROUNDS).then( hashedPassword =>{
            conn.query( "INSERT INTO 2019Spring_Persons (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
                    [[input.FirstName, input.LastName, input.Birthday, hashedPassword, new Date()]],
                    (err, data) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        model.get(data.insertId, (err, data)=>{
                            cb(err, data);
                        })
            });
        });
    },
    login(email, password, cb){
        conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email, (err, data) => {
            if(err) return cb(err);
            if(data.length == 0){
                return cb('User Not Found')
            }else{
                bcrypt.compare(password, data[0].Password).then(x=>{
                    if(x){
                        return cb(null, data[0]);
                    }else{
                        return cb('Wrong Password');
                    }
                });
            }
        });    
    },
    changePassword(email, oldPassword, newPassword, cb){
        conn.query(`SELECT * FROM 2019Spring_Persons P
                        Join 2019Spring_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email, (err, data) => {
            if(err) return cb(err);
            if(data.length == 0){
                return cb('User Not Found')
            }else{
                function changeIt(){
                    bcrypt.hash(newPassword, SALT_ROUNDS).then(x=>{
                        conn.query(`Update 2019Spring_Persons P
                                        Set ?
                                    WHERE P.id=?`,[ {Password: x }, data[0].id], (err, data) => {
                                        if(err) return cb(err);
                                        return cb(null, "Password Succesfully Changed");
                                    })
                    })
                }
                if(data[0].Password == ""){
                    return changeIt();
                }else{
                    bcrypt.compare(oldPassword, data[0].password).then(x=>{
                        if(x){
                            return changeIt();
                        }else{
                            return cb('Wrong Password');
                        }
                    });
                }
            }
        });    
    }
};

module.exports = model;