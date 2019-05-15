// QUERY

var spicedPg = require('spiced-pg');

var db = spicedPg(
    process.env.DATABASE_URL ||'postgres:postgres:postgres@localhost:5432/wintergreen-socialnet');

module.exports.users = function users(
    firstname,
    lastname,
    email,
    password
) {
    return db.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) returning id", [
        firstname || null,
        lastname || null,
        email || null,
        password || null
    ]);
};

module.exports.checkPass = function checkPass(email) {
    return db.query("SELECT id, email, password FROM users WHERE email= $1", [email]);

};


module.exports.getUserId = function getUserId(id) {
    return db.query(`SELECT firstname, lastname, imgurl, bio, id FROM users WHERE id = $1`, [id],
    );
};


module.exports.userPicUpdate = function userPicUpdate(id, imgurl) {
    return db.query( `UPDATE users SET imgurl= $1 WHERE id =$2`, [id, imgurl],
    );
};

module.exports.addBio = function addBio(id, bio) {
    return db.query("UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio", [
        id || null,
        bio
    ]);
};

module.exports.getBio = function getBio(bio) {
    return db.query("SELECT bio FROM users WHERE id = $1", [
        bio
    ]);
};

module.exports.getInitialStatus = function getInitialStatus(id, otherId) {
    let q = `SELECT * FROM friendships
     WHERE (receiver=$1 AND sender=$2)
     OR (receiver=$2 AND sender=$1)`;
    let params = [id, otherId];

    return db.query(q, params);
};


module.exports.sendFriendRequest = function sendFriendRequest(id, otherId) {
    let q = "INSERT INTO friendships (receiver, sender) VALUES($1, $2) RETURNING *";
    let params = [id, otherId];

    return db.query(q, params);
};

module.exports.cancelFriendRequest = function cancelFriendRequest(id, otherId) {
    let q = `DELETE FROM friendships WHERE (receiver=$1 AND sender=$2) OR (receiver=$2 AND sender=$1)`;
    let params = [id, otherId];
    return db.query(q, params);
};

module.exports.acceptFriendRequest = function acceptFriendRequest(id, otherId) {
    const q = `UPDATE friendships SET accepted = true WHERE (receiver=$1 AND sender=$2) OR (receiver=$2 AND sender=$1)`;
    const params = [id, otherId];
    return db.query(q, params);
};


module.exports.getAllFriendRequests = function getAllFriendRequests(id) {
    let q = `
    SELECT users.id, firstname, lastname, imgurl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver = $1 AND sender = users.id )
    OR (accepted = true AND receiver = $1 AND sender = users.id )
    OR (accepted = true AND sender = $1 AND receiver = users.id )`;
    let params = [id];

    return db.query(q, params);
};


module.exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
    const query = `SELECT id, firstname, lastname, imgurl FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};

module.exports.getChatMessages = function getChatMessages() {
    let q = `SELECT users.firstname, users.lastname, users.imgurl, chat.id, chat.messages, chat.userId, chat.created_at
    FROM chat
    JOIN users
    ON chat.userid = users.id
    ORDER BY ID DESC LIMIT 10
    `;

    return db.query(q);
};

exports.chatNewMessage = function chatNewMessage(messages, userid) {
    let q = `INSERT INTO
            chat (messages, userid)
            VALUES ($1, $2)
            RETURNING * `;
    let params = [messages, userid];

    return db.query(q, params);
};

//Like QUERY

exports.addLike = function addLike(userid, commentid) {
    let q = `INSERT INTO
            likes (userid, commentid)
            VALUES ($1, $2)
            RETURNING * `;
    let params = [userid, commentid];

    return db.query(q, params);
};


exports.showlikes = function showlikes() {
    let q = `SELECT COUNT(*), chat.messages, users.firstname, users.lastname, users.imgurl from likes
    JOIN chat
    ON chat.id = likes.commentid
    JOIN users
    ON users.id = likes.userid
    group by commentid, chat.messages, users.firstname, users.lastname, users.imgurl
    order by commentid
    DESC`;
    let params = [];

    return db.query(q, params);
};


// queries private MESSAGES

exports.privateNewMessage = function privateNewMessage(senderUserid, receiverUserid, message) {
    let q = `INSERT INTO
            messages (senderUserid, receiverUserid, message)
            VALUES ($1, $2, $3)
            RETURNING * `;
    let params = [senderUserid, receiverUserid, message];

    return db.query(q, params);
};
