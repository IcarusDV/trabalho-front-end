const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/send-email', (req, res) => {
    const { nome, email, celular, mensagem } = req.body;


    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'seu_email@gmail.com', 
            pass: 'sua_senha' 
        }
    });


    const mailOptions = {
        from: 'seu_email@gmail.com',
        to: 'destinatario_email@gmail.com', 
        subject: 'Mensagem do site pessoal',
        html: `
            <p>Nome: ${nome}</p>
            <p>E-mail: ${email}</p>
            <p>Celular: ${celular}</p>
            <p>Mensagem: ${mensagem}</p>
        `
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('E-mail enviado com sucesso');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
