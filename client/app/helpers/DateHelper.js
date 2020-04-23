class DateHelper {

    constructor () {
        throw new Error('DateHelper não pode ser instanciado');
    }

    static textoParaData (texto) {
        return new Date(...texto.split('-').map((v, index) => (index == 1 ? v - 1 : v)));
    }

    static dataParaTexto (data) {
        if (!/\d{4}-\d{2}-\d{2}/.test(data)) throw new Error('Deve estar no formato aaaa-mm-dd');
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }
}