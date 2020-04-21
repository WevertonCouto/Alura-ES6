class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.prevenDefault();
        let negociacao = new Negociacao(
            new Date(...this._inputData.value.split('-').map((v, index) => (index == 1 ? v - 1 : v)),
                this._inputQuantidade.value,
                this._inputValor.value
            )
        )
    }

}