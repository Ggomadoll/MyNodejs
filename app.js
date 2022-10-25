const express = require("express"); // 설치된 express 사용 선언

const app = express();      //express 실행 app 변수에 대입

const router = require("./router/route.js");
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const Sessionrouter = require("./router/Sessionrouter.js");
const Messagerouter = require("./router/Messagerouter.js");
const bodyparser = require("body-parser");
let ejs = require("ejs");
const session = require("express-session");
const mysql_session = require("express-mysql-session")

app.set("view engine", "ejs");

let conn = {
    host : "127.0.0.1",
    user : "root",
    password : "4511to",
    port : "3306",
    database : "nodejs_db"
}

let conn_session = new mysql_session(conn);

app.use(session({
    secret: "smart",
    resave : false, // 저장
    saveUninitialized : true, //초기화
    store : conn_session
}))

app.use(express.static("./public"));

app.use(bodyparser.urlencoded({extended:false})); 
// post방식일때 body 영역을 분석해주는 미들웨어로 bodyparser등록
app.use(router); // 미들웨어로 router등록
app.use(DBrouter);
app.use(EJSrouter);
app.use(Sessionrouter);
app.use(Messagerouter);
app.listen(3001); // 현재 서버파일의 port 번호 설정