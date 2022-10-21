
const express = require("express");

const router = express.Router();    // express 갖고있는 기능중에 router기능을 사용



router.get("/plus", (request, response) => {// plus라우터 기능정의 및 등록
    console.log("/plus 라우터 호출")
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));
    
    // 응답해야할 코드를 지정
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"}); 
    response.write("<html>");   
    response.write("<body>");
    response.write("응답성공<br>");
    response.write("결과값 :" +  (parseInt(request.query.num1)+parseInt(request.query.num2)));
    response.write("</body>");
    response.write("</html>");
    response.end();

});


router.get("/cal", (request, response) => {// cal 기능정의 및 등록
    //1. 사용자 입력한 값을 가져오기
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;
    
    

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오'

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"}); 
    response.write("<html>");
    response.write("<body>");
    response.write("응답");
    
    if(cal == "+") {
        response.write("결과값 : " + (parseInt(num1)+parseInt(num2)))
    } else if(cal == "-") {
        response.write("결과값 : " +s (parseInt(num1)-parseInt(num2)))
    } else if(cal == "*") {
        response.write("결과값 : " + (parseInt(num1)*parseInt(num2)))
    } else if(cal == "/") {
        response.write("결과값 : " + (parseInt(num1)/parseInt(num2)))
    }


    response.write("</body>");
    response.write("</html>");
    response.end();


})


// Grade 라우터 - POST 방식 사용
router.post('/Grade', (req, res) => {
    const name = req.body.name;
    const java = Number(req.body.java);
    const web = Number(req.body.web);
    const iot = Number(req.body.iot);
    const android = Number(req.body.android);
    let avg = (java + web + iot + android)/4;
    let grade = '';
    if(avg>=95)
        grade = 'A+';
    else if(avg>=90)
        grade = 'A';
    else if(avg>=85)    
        grade = 'B+';
    else if(avg>=80)
        grade = 'B';
    else if(avg>=75)
        grade = 'C';
    else
        grade = 'F';
    

    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.write("<html>")
    res.write("<body>");
    res.write("name : "+name+'<br/>');
    res.write("java : "+java+'<br/>');
    res.write("web : "+web+'<br/>');
    res.write("iot : "+iot+'<br/>');
    res.write("android : "+android+'<br/>');
    res.write("avg : "+avg+'<br/>');
    res.write("grade : "+grade);
    res.write("</body>");
    res.write("</html>");
    res.end();
})


router.post('/join', (req,res) => {

    let id = req.body.id;
    let pw = req.pw.id;
    let name = req.body.name;
    let email =req.body.email;
    let tel = req.body.tel;
    let gender = req.body.gender;
    let country = req.body.country;
    let birth = req.body.birth;
    let color = req.body.color;
    let hobby = req.body.hobby;
    let talk = req.body.talk;



    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.write("<html>")
    res.write("<body>");
    res.write("id : "+id+'<br/>');
    res.write("pw : "+pw+'<br/>');
    res.write("name : "+name+'<br/>');
    res.write("email : "+email+'<br/>');
    res.write("tel : "+tel+'<br/>');
    res.write("gender : "+gender+'<br/>');
    res.write("country : "+country+'<br/>');
    res.write("birth : "+birth+'<br/>');
    res.write("color : "+color+'<br/>');
    res.write("hobby : "+hobby+'<br/>');
    res.write("talk : "+talk+'<br/>');
    res.write("</body>");
    res.write("</html>");
    res.end();


})


router.get("/Message", (req,res) => {

    res.render("message", {});
})



    module.exports = router;
