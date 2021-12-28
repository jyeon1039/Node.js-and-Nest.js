const nodemailer = require('nodemailer');

const authUser = "발신자 계정 이메일";
const authPass = "발신자 계정 이메일";
const fromEmail = "발신자 계정";

let toEmail = "수신자 계정 이메일";
let title = "제목";
let txt = "본문";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gamil.com",    //SMTP 서버 주소
    port: 587,
    secure: false,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
    requireTLS: false,
    auth: {
        user: authUser,
        pass: authPass
    }
});

let mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: title,
    text: txt
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) console.log(error);

    console.log("Finish sending email : " + toEmail);       
    transporter.close(); 
});