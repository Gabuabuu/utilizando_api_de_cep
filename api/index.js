const express = require('express'); //Está const tá requisitando o express
const server = express(); //Está cons tá chamando o express com todos os seus modulos.

server.get('/usuario', (req, res) => {
    return res.json({usuario: 'Olá Gabu'})
})

server.listen(3000, () => {
     console.log('Servidor está funcionando')
})