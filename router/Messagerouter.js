const express = require('express');
const Messagerouter = express.Router();
const conn = require('../config/DBConfig.js'); //DB 정보 등록

// Message 라우터
Messagerouter.get('/Message', (req, res) => {
    res.render("message", {
        user : req.session.user
    });
})

// MessageJoin 라우터
Messagerouter.post('/MessageJoin', (req, res) => {
    let email = req.body.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;

    let sql = "insert into web_member values(?,?,?,?,now())";

    conn.query(sql, [email, pw, tel, address], (err, row) => {
        if (!err) {
            console.log("입력 성공 : "+row);
            res.redirect('http://127.0.0.1:3001/Message');
        } else {
            console.log("입력 실패 : " + err);
        }
    })
})

// MessageLogin 라우터
Messagerouter.post('/MessageLogin', (req, res) => {
    let email = req.body.email;
    let pw = req.body.pw;

    let sql = "select * from web_member where email=? and pw=?";

    conn.query(sql, [email, pw], (err, row) => {
        if (err) {
            console.log("로그인 실패 : " + err);
        } else if (row.length > 0) { //로그인 성공
            // 세션값 저장하기
            req.session.user = {
                "email": row[0].email,
                "tel": row[0].tel,
                "address": row[0].address
            };

            console.log("session영역에 이메일 저장 성공" + req.session.user);
            console.log(row);

            res.render("message", {
                user : req.session.user
            })
        } else if (row.length == 0) {   //로그인 실패
            res.redirect("http://127.0.0.1:5500/public/ex05LoginF.html");
        }
    });
});

// MessageLogout 라우터
Messagerouter.get('/MessageLogout', (req, res) => {
    delete req.session.user;
    res.redirect('http://127.0.0.1:3001/Message');
});


module.exports = Messagerouter;