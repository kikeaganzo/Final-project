const express = require('express');
const app = express();
const csurf = require("csurf");
const compression = require('compression');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
const bcrypt = require('./bcrypt.js');
const db = require('./db');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const s3 = require('./s3');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

const cookieParser = require("cookie-parser");
app.use(cookieParser());


io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

const cookieSessionMiddleware = cookieSession({

    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(express.static("./public"));

app.use(cookieSessionMiddleware);


app.use(bodyParser.json());
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});
// ___



app.use(compression());


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.post("/registration", (req, res) => {
    if (
        req.body.firstname != "" &&
        req.body.lastname != "" &&
        req.body.email != "" &&
        req.body.password != ""
    ) {
        bcrypt.hashPassword(req.body.password).then(hash => {
            return db
                .users(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hash
                )
                .then(data => {
                    req.session.userId = data.rows[0].id;
                    res.json({ success: true});
                })
                .catch(error => {
                    console.log(error);
                    res.json({error : true});
                });
        });
    }
});

app.get('/users/:id',( req, res)=>{
    if(req.params.id == req.session.userId){
        res.json({user:true});
    }

    db.getUserId(req.params.id).then(results=>{
        res.json(results.rows[0]);
    });
});


app.post('/login', (req, res) => {
    console.log("req.body.password", req.body.password);
    db.checkPass(req.body.email, req.body.password).then(results => {
        console.log("results.rows[0].password", results.rows[0]);

        bcrypt
            .checkPassword(req.body.password, results.rows[0].password)
            .then(match => {
                if (match) {
                    req.session.userId = results.rows[0].id;
                    res.json({success: true});
                } else {
                    res.json({error: true});
                }
            })
            .catch(err => {
                console.log(err);
                res.json({error: true});
            })
            .catch(err => {
                console.log(err);
                res.json({error: true});
            });
    });
});

// POST UPLOAD PIC
var diskStorage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(request, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    if (req.file) {
        console.log('file in upload: ', req.file);
        var urlConc = 'https://s3.amazonaws.com/aganzo/' + req.file.filename;
        console.log("url complete of the pic", urlConc);

        db.userPicUpdate(urlConc, req.session.userId)
            .then(data => {
                console.log('data in userPicUpdate: ', data );
                res.json({urlConc});
            })
            .catch(error => {
                console.log(error);

            });
    }
});

app.get("/bio", (req, res) => {
    db.getBio(req.session.userId)
        .then(data => {
            console.log("data.rows[0]", data.rows[0]);
            res.json(data);
        })
        .catch(error => {
            console.log("Error, ", error);
        });
});


app.post("/addbio", (req, res) => {
    console.log("userId :", req.session.userId);
    db.addBio(req.session.userId, req.body.bio)
        .then(data => {
            console.log("data.rows[0]", data.rows[0]);
            res.json(data);
        })
        .catch(error => {
            console.log("Error, ", error);
        });
});


app.get("/get-initial-status/:id", (req, res) => {
    console.log("userId from /get-initial-status :", req.session.userId);
    db.getInitialStatus(req.session.userId, req.params.id)
        .then(data => {
            console.log("req.session.userId from /get-initial-status", req.session.userId);
            res.json(data);
            console.log("DATA FROM GET INITIAL STATUS", data);
        })
        .catch(error => {
            console.log("Error from /get-initial-status, ", error);
        });
});


app.post("/add-new-friend", (req, res) => {
    console.log("req.session.userId, req.body.Id", req.session.userId, req.body.id);
    db.sendFriendRequest(req.session.userId, req.body.id)
        .then(data => {
            res.json(data);
            console.log("add-new-friend server data :", data);
        })
        .catch(error => {
            console.log("ERROR in send Friends Request: ", error);
        });
});

app.post("/delete-friend", (req, res) => {
    console.log("DELETE-friend SERVER", req.session.userId, req.body.id);
    db.cancelFriendRequest(req.session.userId, req.body.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(
                "Error in post delete friend: ",
                error
            );
        });
});

app.post("/accept-friend", (req, res) => {
    console.log("req.session.userId, req.body.id", req.session.userId, req.body.Id);
    db.acceptFriendRequest(req.session.userId, req.body.Id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("Error" , error);
        });
});


//middleware function
function requireLoggedInUser(req, res, next) {
    if (!req.session.userId) {
        res.sendStatus(403);
    } else {
        next();
    }
}

app.get("/user", (req, res) => {
    db.getUserId(req.session.userId)
        .then(data => {
            console.log('data in getUserId: ', data);
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("err in getUser", err);
        });
});

app.get("/friends.json", (req, res) => {
    console.log("Friends from Redux get");
    db.getAllFriendRequests(req.session.userId)
        .then(data => {
            console.log('friends ', data);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("err in getUser", err);
        });
});

//Part 7
app.post("/delete", (req, res) => {
    console.log("DELETE SERVER", req.session.userId, req.body.id);
    db.cancelFriendRequest(req.session.userId, req.body.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(
                "Error in post delete friend: ",
                error
            );
        });
});

app.post("/update", (req, res) => {
    console.log("req.session.userId, req.body.id", req.session.userId, req.body.Id);
    db.acceptFriendRequest(req.session.userId, req.body.Id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("Error" , error);
        });
});


app.post("/addlike", (req, res) => {
    db.addLike(req.session.userId, req.body.messagesid)
        .then(data => {
            res.json(data);
            console.log(data);
        })
        .catch(error => {
            console.log("Error" , error);
        });
});

app.get("/show-likes", (req, res) => {
    db.showlikes()
        .then(data => {
            res.json(data.rows);
            console.log("LIKES data", data.rows);
        })
        .catch(error => {
            console.log("Error from show-likes, ", error);
        });
});

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});



server.listen(8080, function() {
    console.log("I'm listening.");
});


const onlineUsers = {};

io.on('connection',socket=>{
    console.log('SOCKET HERE!!!!!', socket.id);

    const {userId} = socket.request.session;
    if (!userId){
        return socket.disconnect();
    }
    onlineUsers[socket.id] = userId;

    const idsOnlineUsers = Object.values (onlineUsers);

    db.getUsersByIds(idsOnlineUsers).then(({rows})=>{
        socket.emit('onlineUsers',{
            onlineUsers: rows
        });
    }
    );

    const usersHere = Object.values(
        onlineUsers).filter(id => id == userId).length > 1;
    if(!usersHere){
        db.getUserId(userId).then(({rows})=>{
            socket.broadcast.emit('userJoined',{
                user:rows[0]
            });

        });
    }

    socket.on('disconnect',()=>{
        console.log('Socket disconnect here');
        delete onlineUsers[socket.id];


        const byeUser=  !Object.values(onlineUsers).includes(userId);
        if (byeUser){socket.broadcast.emit('userLeft', userId);}
    });

    db.getChatMessages()
        .then(data => {
            console.log("data in server for getChatMessages", data);
            socket.emit("messages", data.rows);
        })
        .catch(error => {
            console.log("error in server for getChatMessages", error);
        });

    socket.on("newChatMsg", message => {
        console.log("data in newChatMsg", message);
        db.chatNewMessage(message, userId).then(data => {

            console.log("SERVER Data in chatNewMessage ", data.rows);
            db.getUserId(userId)
                .then(data => {
                    console.log("data in INDEX get user ID", data);
                    const comment = {
                        firstname: data.rows[0].firstname,
                        lastname: data.rows[0].lastname,
                        imgurl: data.rows[0].imgurl,
                        messages:  message,
                        // created_at: data.rows[0].created_at
                        // lastname:
                    };
                    console.log("DATA SERVER comment", comment);
                    socket.emit("chatMessages", comment);
                })
                .catch(error => {
                    console.log("error server for getChatMessages", error);
                });
        });
    });

    //socket private messages

    socket.on( 'newMessagePrivate', privateMessage => {
        console.log("newMessagePrivate socket.id", socket.id);
        const senderUserid = socket.id;
        const receiverUserid = onlineUsers.find( user => user.id );


        const receiverSocket_Id = receiverUserid && receiverUserid.socketId;

        return db.privateNewMessage( senderUserid, receiverUserid, message );


    } );



});
