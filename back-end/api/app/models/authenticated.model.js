const sql = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Authenticated = function(user) {
    this.loginname = user.loginname;
    this.userpassword = user.userpassword;
}


Authenticated.login = (user, result) => {
    // console.log(`SELECT * FROM User where User.loginname = ${user.loginname}`)
    sql.query(`SELECT * FROM  User where User.loginname = '${user.loginname}'`,
    (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        if (!res.length) {
            console.log('Username or password is incorrect!');
            result({ message:'Username or password is incorrect!' }, null)
            return
        }

        bcrypt.compare(
            user.userpassword,
            res[0].userpassword,
            (bErr, bResult) => {
                if (bErr) {
                    console.log('Username or password is incorrect!');
                    result({ message:'Username or password is incorrect!' }, null)
                    return
                }

                if (bResult) {
                    var d = new Date();

                    var calculatedExpiresIn = d.getTime() + 45*60000
                    
                    const token = jwt.sign({
                            id_user: res[0].id_user,
                            iat: (new Date).getTime()
                        },
                        'SECRETKEY', 
                        { expiresIn: 45*60000 });

                    //console.log(token)
                    sql.query(`UPDATE User SET last_login = now() WHERE id_user= '${res[0].id_user}'`)
                    result(null, {message: 'Login success!', token, id_user: res[0].id_user})
                }
                else {
                    result({ message:'Username or password is incorrect!' }, null)
                }
            }
        );
    })
}

module.exports = Authenticated