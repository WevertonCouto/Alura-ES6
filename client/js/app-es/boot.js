import {NegociacaoController} from './controllers/NegociacaoController';

let negociacaoController = new NegociacaoController();

document.querySelector('#btnAdd').onclick = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#btnApagar').onclick = negociacaoController.apaga.bind(negociacaoController);