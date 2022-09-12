import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'film',
    title: 'Filmes',
    subtitle: 'Cadastro de filmes: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:52149/api/Filmes'
const initialState = {
    filme: { titulo: '', classificacaoIndicativa: '', lancamento: '' },
    list: []
}

export default class FilmeCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ filme: initialState.filme })
    }

    save() {
        const filme = this.state.filme
        const method = filme.id ? 'put' : 'post'
        const url = filme.id ? `${baseUrl}/${filme.id}` : baseUrl
        axios[method](url, filme)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ filme: initialState.filme, list })
            })
    }

    getUpdatedList(filme, add = true) {
        const list = this.state.list.filter(u => u.id !== filme.id)
        if(add) list.unshift(filme)
        return list
    }

    updateField(event) {
        const filme = { ...this.state.filme }
        filme[event.target.name] = event.target.value
        this.setState({ filme })
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Título</label>
                            <input type="text" className="form-control"
                              name="titulo"
                              value={this.state.filme.titulo}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite o título..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                       <div className="form-group">
                            <label>Classificação Indicativa</label>
                            <input type="number" className="form-control"
                              name="classificacaoIndicativa"
                              value={this.state.filme.classificacaoIndicativa}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite a classificação indicativa..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                       <div className="form-group">
                            <label>Lançamento</label>
                            <input type="number" className="form-control"
                              name="lancamento"
                              value={this.state.filme.lancamento}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite o lançamento (0)Comum, (1)Lançamento..." />
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Salvar
                            </button>
                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    load(filme) {
        this.setState({ filme })
    }

    remove(filme) {
        axios.delete(`${baseUrl}/${filme.id}`).then(resp => {
            const list = this.getUpdatedList(filme, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Classificação Indicativa</th>
                        <th>Lançamento</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(filme => {
            return (
                <tr key={filme.id}>
                    <td>{filme.titulo}</td>
                    <td>{filme.classificacaoIndicativa}</td>
                    <td>{filme.lancamento}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(filme)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(filme)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
