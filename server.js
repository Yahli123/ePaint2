const express = require('express');


const sqlite3 = require('sqlite3')


const db = new sqlite3.Database('mydb.db');


const app = express();

const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(("views")));

app.get('/', (req, res) => {

    res.render('index');
})

app.get('/Login_Page', (req, res) => {

    res.render('Login_Page');
})

app.get('/Sign_Up_Page', (req, res) => {

    res.render('Sign_Up_Page');
})

app.get('(/Painter_page_Guest_Version)', (req, res) => {

    res.render('Painter_page_Guest_Version');
})

app.get('/Home_page', (req, res) => {

    res.render('Home_page');
})

app.get('/My_Photos_Page', (req, res) => {

    res.render('My_Photos_Page');
})

app.get('/Painter_page_User_Version', (req, res) => {

    res.render('Painter_page_Guest_Version');
})

app.get('/Photo_page', (req, res) => {

    res.render('Photo_page');
})
 
app.post('/create-user',async(req,res) => {

    const { email, username, password } = req.body;
    try {
        const existingUser = await checkUser(email, username)
        if (existingUser.email !== null || existingUser.username !== null) {
            console.log('Email or username is already in use');

            return res.status(400).json({success: false, 'message': 'email or username are taken.'});
        } else {
            const query = 'INSERT INTO users (username, email, password) VALUES (? , ? , ?)';
            db.run(query, [username, email, password])

            res.status(200).json({success: true, 'message': 'user created successfully.', redirect: '/Home_page'});
        }
        
    } catch (error) {
        console.log(error.message);

        res.status(400).json({success: false, 'message': 'error creating user.'});
    }
})

async function checkUser(identifier) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT email, username, password FROM users WHERE email = ? OR username = ?';
        db.get(query, [identifier, identifier], (err, row) => {
            if (err) {
                reject(err);
            } else {

                // Ensure the user object has 'email', 'username', and 'password' properties
                const user = {
                    email: row ? row.email : null,
                    username: row ? row.username : null,
                    password: row ? row.password : null,
                };

                resolve(user);
            }
        });
    });
}


app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
});