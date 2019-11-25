const sendgrid = require('sendgrid');

module.exports = (app) => {
    app.get('/api/mail', (req, res) => {
        var helper = sendgrid.mail;
        var from_email = new helper.Email(process.env.SENDGRID_USERNAME);
        var to_email = new helper.Email('fernag@usi.ch');
        var subject = 'Hello World from the SendGrid Node.js Library!';
        var content = new helper.Content('text/plain', 'Hello, Email!');
        var mail = new helper.Mail(from_email, subject, to_email, content);
        var sg = sendgrid(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
    });
}