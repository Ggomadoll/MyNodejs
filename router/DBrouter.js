const express = require("express");

const DBrouter = express.Router();

const conn = require("../config/DBconfig.js");

DBrouter.post('/Login', (req,res) => {

    let id = req.body.id;
    let pw = req.body.pw;

    
    let sql = "select * from member where id = ?";
    
    conn.query(sql, [id, pw], (err, row) => {
       
        if(err) {
            res.log("검색실패 : " + err);
        }else if (row.length > 0) {
            // 로그인 성공
            //LoginS.html -> ejs로 변환하시오.
            //1.LoginS.html을 ejs파일로 변경하여 views 이동
            //2.Login라우터에서 LoginS.ejs파일을 랜더링
            //3.랜더링할 때 로그인에 성공한 id값을 전송
            //4.ejs파일에서 로그인에 성공한 id값을 출력


            req.session.user = id;

            console.log("session영역에 id저장 성공" + req.session.user);


            res.render("LoginS", {
                id_name : id
            })
          
        }else if(row.length == 0) {
          res.redirect("http://127.0.0.1:3001/Main");
        }
       

    });



    // if(id === 'smart' && pw === 123) {

    //     res.redirect("http://127.0.0.1:5500/public/ex05.LoginS.html");
    // }else{
    //     res.redirect("http://127.0.0.1:5500/public/ex05.LoginF.html");
    // }


});





DBrouter.post('/JoinDB', (req,res) => {

    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;

    let sql = "insert into member values(?,?,?)";


    conn.query(sql, [id, pw, nick], (err, row) => {
        if(!err) {
            console.log("입력성공" + row);
            res.redirect("http://127.0.0.1:3001/Main");

        }else{
            console.log("입력실패" + err);
        }
        
          
    });


    // 회원삭제 라우터 만들기
    // 1.get방식의 /Delete 라우터 생성
    // 2. 사용자가 입력한 id값 가져오기
    // 3. id값을 통해 member 테이블에 있는 id값 삭제하기
    // 4. 삭제 성공 후 Main.html로 돌아가기

});

DBrouter.get("/Delete", (req, res) => {

    let id = req.query.id;


    let sql = "delete from member where id = ?";

    conn.query(sql, [id], (err, row) => {
        if(err) {
            console.log("삭제실패" + err);
            
        }else if(row.affectedRows > 0){
            console.log("명령에 성공한 수 :" + row.affectedRows)
            res.redirect("http://127.0.0.1:3001/Main");
        }else if (row.affectedRows == 0){
            console.log("삭제실패" + err);
        }
        
        

});


})


DBrouter.post("/Update", (req, res) => {

    // 사용자가 입력한 id의 pw를 변경하고
    // 성공 후 Main.html 페이지로 이동하시오

    let id = req.body.id;
    let select = req.body.select;   // pw or nick
    let data = req.body.data;   // 변경될 데이터
    let sql = "";

    if(select === "pw") {
        sql = "update member set pw =? where id= ?";
    }else if (select === "nick") {
        sql = "update member set nick =? where id= ?";
    }
    
    conn.query(sql, [select, data, id], (err, row) => {
        
        
        if(err) {
            console.log("수정실패" + err);  
            
        }else if(row.affectedRows > 0){
            console.log("명령에 성공한 수 :" + row.affectedRows)
            res.redirect("http://127.0.0.1:3001/Main");
        }else if (row.affectedRows == 0) {
            console.log("수정된 값이 없습니다" + err);
        }
        
        

});


})




DBrouter.get("/SelectAll", (req,res) => {

   

    let sql = "select * from member";

    conn.query(sql,  (err, row) => {
       
        if(err) {
            console.log("검색실패 : " + err);
        }else if (row.length > 0) {
            console.log("검색된 데이터의 수 :" + row.length);

            res.render("SelectAll", {
                row_names : row
            }) 
           
        
            
        }else if(row.length == 0) {
            console.log("검색된 데이터가 없습니다")
        }
       
       
        console.log("검색된 데이터의 수 : " + row.length);
        console.log(row);   
        
          
    });


    // 회원삭제 라우터 만들기
    // 1.get방식의 /Delete 라우터 생성
    // 2. 사용자가 입력한 id값 가져오기
    // 3. id값을 통해 member 테이블에 있는 id값 삭제하기
    // 4. 삭제 성공 후 Main.html로 돌아가기

});



    // 회원검색 라우터 만들기
    // 1.get방식의 /SelectOne 라우터 생성
    // 2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오

    DBrouter.get("/SelectOne", (req,res) => {

        let id = req.query.id;
   

        let sql = "select * from member where id = ?";
    
        conn.query(sql, [id], (err, row) => {
           
            if(err) {
                console.log("검색실패 : " + err);
            }else if (row.length > 0) {
                console.log("검색된 데이터의 수 :" + row.length);
                console.log(row);
    
            res.render("SelectOne", {
                row_name : row 
            })  
                
                
            }else if(row.length == 0) {
                console.log("검색된 데이터가 없습니다")
            }
           
           
            console.log("검색된 데이터의 수 : " + row.length);
            console.log(row);   
            
              
        });
    
    
    
    });


    DBrouter.get("/SelectDelete", (req, res) => {

        let id = req.query.id;
    
    
        let sql = "delete from member where id = ?";
    
        conn.query(sql, [id], (err, row) => {
            if(err) {
                console.log("삭제실패" + err);
                
            }else if(row.affectedRows > 0){
                console.log("명령에 성공한 수 :" + row.affectedRows)
                res.redirect("http://127.0.0.1:3001/Main");
            }else if (row.affectedRows == 0){
                console.log("삭제실패" + err);
            }
            
            
    
    });
    
    
    })

    DBrouter.get("/Main", (req,res) => {
        
        res.render("Main", {

            id : req.session.id
        })
    })
    
module.exports = DBrouter;