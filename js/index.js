'use strict';

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = ''; //Limpa o formulário
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
} 

const preencherForm = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro; //seleciona o input endereço, depois de receber como parametro a cons endereco com as informações em json, ele preenche o campo endereco em formato json. Ele pega o endereco.value e recebe como valor as informações da const endereco
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf
} 

const eNumero = (numero) => /^[0-9]+$/.test(numero);//validar CEP, para ver se todos os números do inicio(^) ao fim($)ou(+$)
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();//Limpa o formulario caso o cep não exista ou esteja errado
    const cep = document.getElementById('cep').value;//const pegando o valor do input do cep dado pelo usuario
    const url = `http://viacep.com.br/ws/${cep}/json/`;//url da api consumida(cep)
    if(cepValido(cep)) {
        const dados = await fetch(url);// (await fetch) "Aguarde eu resolver..."? or uma promise ?
        const endereco = await dados.json()//Transforma as informações da const dados em formato json, depois retorna em formato json(Ou seja pega somente as informações que eu quero)
        if(endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!' //Caso o cep não exista, exibe uma mensagem dizendo que o cep não existe
        } else {
            preencherForm(endereco); //caso contrario, ele exibe o cep
        }
    } else {
        document.getElementById('endereco').value = 'CEP invalido'
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);