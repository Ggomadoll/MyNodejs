const express = require('express');
const Messagerouter = express.Router();
const conn = require('../config/DBConfig.js'); //DB 정보 등록
        
// Message 라우터
Messagerouter.get('/Message', (req, res) => {
   
    // 현재 로그인한 사람에게 온 메세지를 검색

    let sql = "select * from web_message where rec = ?";
   if(  req.session.user){
    conn.query(sql, [req.session.user.email], (err, row) => {
        console.log(row);

        res.render("message", {
            user : req.session.user,
            row_name : row
        });
    })
}else{
    res.render("message", {
        user : req.session.user
    });
}

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
});

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
                email: row[0].email,
                tel: row[0].tel,
                address: row[0].address
            };
        
           

            res.redirect("http://127.0.0.1:3001/Message");
        } else if (row.length == 0) {   //로그인 실패
            res.redirect("http://127.0.0.1:5500/public/ex05LoginF.html");
        }
    });
});


Messagerouter.post('/MessageUpdate', (req, res) => {

    //update.ejs파일을 랜더링
    res.render("update", {
        user : req.session.user
    })
})

Messagerouter.post('/MessageUpdateexe', (req, res) => {
    let email = req.session.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;


    // 사용자가 입력한 pw,tel,address로 email의 정보를 수정하시오


    let sql = "update web_member set pw = ?, tel=?, address=? where email=?";

    conn.query(sql, [pw, tel, address,email], (err, row) => {
        if (!err) {
            console.log("수정 성공 : "+row);
        req.session.user = {
            "email" : row[0],email,
            "tel" : tel,
            "address" : address
        }
          
            res.redirect('http://127.0.0.1:3001/Message');
        } else {
            console.log("수정 실패 : " + err);
        }
    })
})

Messagerouter.get('/MessageMemberSelect', (req, res) => {
   
    let sql = "select * from web_member";

    conn.query(sql, [email, pw], (err, row) => {
        if (err) {
            console.log("로그인 실패 : " + err);
        } else if (row.length > 0) { //로그인 성공
            // 세션값 저장하기

     
        
           
            console.log(row);

            res.render("selectMember", {
                row_name : row
            })
        } else if (row.length == 0) {  
             //검색된 데이터가 없을 때
            res.redirect("http://127.0.0.1:3001/Message");
        }
    });
});



Messagerouter.get('/MessageDelete', (req, res) => {
   
    let email = req.query.email;
    
    let sql = "delete from web_member where email = ?";

    conn.query(sql, [email],(err, row) => {
        if (!err) {
            console.log("수정 성공 : "+row);
            res.redirect("http://127.0.0.1:3001/MessageMemberSelect");
        } else {
            console.log("삭제 실패 : " + err);
        }
    })

   
});

Messagerouter.post('/MessageSend', (req, res) => {
    let send = req.body.send;
    let rec = req.body.rec;
    let content = req.body.content;

    let sql = "insert into web_message(send, rec, content, send_date) values(?,?,?,now())";

    conn.query(sql, [send, rec, content], (err, row) => {
        if (!err) {
            console.log("입력 성공 : "+row);
            res.redirect('http://127.0.0.1:3001/Message');
        } else {
            console.log("입력 실패 : " + err);
        }
    })
});



// MessageLogout 라우터
Messagerouter.get('/MessageLogout', (req, res) => {
    delete req.session.user;
    res.redirect('http://127.0.0.1:3001/Message');
});


module.exports = Messagerouter;