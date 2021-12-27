const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); //post 요청에서 json을 파싱하기 위한 모듈

const app = express();
const port = 3000;

//db 연결
const client = mysql.createConnection({
    host : 'host',
    user : 'DB 아이디',
    password: '비밀번호',
    database: '데이터베이스 이름'
})

app.use(bodyParser.urlencoded({extended:true})); //true => qs 모듈 사용 / false => query-string 모듈 사용
app.use(bodyParser.json());

//모든 user 불러오기
app.get('/all', (req, res) => {
    client.query('SELECT * FROM user', function(err, result, fields) {
        if (err) {
            console.log('DB Query incorrect');
        } else {
            if(result.length == 0){
                res.send('DB에 들어있는 데이터가 존재하지 않습니다.');
            } else{
                let users = new Array();
                for (let i=0; i<result.length; i++){
                    users.push(result[i]);
                }
                res.json(users);
            }
        }
    })
});

//특정 user 불러오기
app.get('/:id', (req, res) => {
    client.query(`SELECT * FROM user WHERE UID=${req.params.id}`, function(err, result, fields){
        if (err) {
            console.log('DB Query incorrect');
        } else {
            if(result.length == 0){
                res.send('DB에 해당하는 데이터가 존재하지 않습니다');
            } else{
                res.json(result[0]);
            }
        }
    })
});

// 회원가입
app.post('/', (req, res) => {
    let body = req.body;
    let sql = {email : body.email, password : body.password, nickName : body.nickName};
    client.query('INSERT INTO user SET ?', sql, function(err, result){
        if(err){
            console.log('DB Query incorrect');
        } else {
            res.send(`${body.nickName} 회원님 등록 완료`);
        }
    })
});

// 로그인
app.post('/login', (req, res) => {
    let body = req.body;
    client.query('SELECT * FROM user WHERE email=? and password=?',[body.email, body.password], function(err, result, fields) {
        if (err) {
            console.log('DB Query incorrect');
        } else {
            if(result.length == 0){
                res.send('아이디 혹은 비밀번호가 잘못되었습니다');
            } else{
                res.send('로그인 성공');
            }
        }
    })
});

// 회원 정보 변경
app.put('/', (req, res) => {
    let body = req.body;
    client.query('UPDATE user SET email=?, password=?, nickName=? WHERE uid=?', [body.email, body.password, body.nickName, body.id], function(err, rows){
        if(err){
            console.log('DB Query incorrect');
        } else {
            res.send(`${body.nickName} 회원님 업데이트 완료`);
        }
    })
});

// 회원 정보 삭제
app.delete('/:id', (req, res) => {
    client.query(`DELETE FROM user WHERE uid=${req.params.id}`, function(err, result){
        if(err){
            console.log('DB Query incorrect');
        } else {
            res.send(`데이터 삭제 완료`);
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});