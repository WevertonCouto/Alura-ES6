class HttpService {

    _handleErrors(res) {
        if (res.ok) return res;
        throw new Error(res.statusText);
    }

    get(url) {
        return fetch(url)
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }

    post(url, dados) {
        return fetch(url, {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'post',
            body: JSON.stringify(dados)
        }).then(res => this._handleErrors(res))
        .then(res => res.json());
    }
}