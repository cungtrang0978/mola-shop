const sql = require('./db')
const bcrypt = require('bcryptjs');

//constructor
const User = function(user) {
    this.id_user = user.id_user,
    this.email = user.email;
    this.loginname = user.loginname;
    this.username = user.username;
    this.address = user.address;
    this.citizen_identification = user.citizen_identification;
    this.phone_number = user.phone_number;
    this.gender = user.gender;
    this.userpassword = user.userpassword;
    this.acc_created = user.acc_created;
    this.avatar = user.avatar;
    this.rate = user.rate;
    this.last_login = user.last_login;
    this.birthday = user.birthday
}

//Create user
User.create = (newUser, result) => {
    sql.query('INSERT INTO User SET ?', newUser, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        console.log("created customer: ", res);
        result(null, { id: res.id_user, ...newUser });
    })
}


//Fetch user
User.fetchUser = (id,result) => {
    sql.query(`SELECT * FROM User WHERE User.id_user='${id}' LIMIT 1`, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, {...res[0], userpassword: '******'})
    })
}

//Update information

User.update = async (user, result) => {
    sql.query(`UPDATE User SET ? WHERE id_user='${user.id}'`, user.user, (err, res) => {
        if (err) {
            console.log('Error: ', err)
            result(err, null)
            return
        }
        result(null, {message: 'Update user successfully!'})
    })
}

User.updateAvatar = (payload, result) => {
    sql.query(`UPDATE User SET avatar = '${payload.link}' WHERE id_user = '${payload.id}' LIMIT 1`, (err, res) => {
        if (err) {
            console.log('Error: ', err)
            result(err, null)
            return
        }
        result(null, {message: 'Update avatar successfully!'})
    })
}

User.getInforWithEmail = (payload, result) => {
    sql.query(`SELECT * FROM User WHERE email='${payload}' LIMIT 1`, (err, res) => {
        if (err) {
            console.log('Error: ', err)
            result(err, null)
            return
        }
        result(null, res)
    })
}

User.changePassword = (payload, result) => {
    sql.query(`SELECT * FROM User where User.id_user = '${payload.user}'`,
    (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        if (!res.length) {
            console.log('User not exist!');
            result({ message:'User not exist!' }, null)
            return
        }

        bcrypt.compare(
            payload.currPassword,
            res[0].userpassword,
            async (bErr, bResult) => {
                if (bErr) {
                    console.log('Password is incorrect!');
                    result({ message:'Password is incorrect!' }, null)
                    return
                }

                if (bResult) {
                    sql.query(`UPDATE User SET userpassword = '${await bcrypt.hash(payload.newPassword, 10)}' WHERE id_user= '${payload.user}'`)
                    result(null, {message: 'Update password success!'})
                }
                else {
                    result({ message:'Password is incorrect!' }, null)
                }
            }
        );
    })
}
module.exports = User