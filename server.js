const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var nodemailer = require('nodemailer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmedawp@gmail.com',
    pass: 'qjcrokxgxbnhreup'
  }
});



// API calls
app.get('/api/hello', (req, res) => {
 res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
 console.log(req.body);
 res.send(
   `I received your POST request. This is what you sent me: ${req.body.post}`,
 );
});

app.post('/api/mail', (req, res) => {

  var mailOptions = {
    from: 'ahmedawp@gmail.com',
    to: req.body.email,
    subject: 'Newsletter abonnement',
    text: 'thanks for the subscribe! RETAILSTREETS Newsletter is coming Soon!'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({
        msg:'fail'
      });
    } else {
      console.log('Email sent: ' + info.body);
      res.json({
        msg:'success'
      });
    }
  });
});



// production
if (process.env.NODE_ENV === 'production') {
 // Serve any static files
 app.use(express.static(path.join(__dirname, 'client/build')));

 // Handle React routing, return all requests to React app
 app.get('*', function(req, res) {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
 });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
