const nodemailer = require('nodemailer');
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("OK");
    });

    app.get('/api/mail', (req, res) => {
        console.log('bateu no mail');

        const testMail = nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testMail.user,
                pass: testMail.pass
            }
        })

        transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'bar@example.com, baz@example.com halie77@ethereal.email', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        });

        console.log("enviou mail");
        res.send('Mail sent!');
    });
}