import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            });
        });
    }
    
    cadastra(negociacao) {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.adiciona(negociacao))
        .then(() => 'Negociação adicionada com sucesso')
        .catch((erro) => {
            throw new Error(erro);
        });
    }

    lista() {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações');
        })
    }

    apaga() {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodos())
        .then(() => 'Negociações apagadas com sucesso')
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações')
        });
    }

    importa(listaAtual, cb) {
        Promise.all([this.obterNegociacoesDaSemana(), 
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()])
        .then(negociacoes => {
            cb(negociacoes.reduce((array1, array) => array1.concat(array), [])
            .filter(negociacao => !listaAtual
                .some(nec => JSON.stringify(nec) == JSON.stringify(negociacao))));
        }).catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível buscar negociação para importar');
        });
    }
}