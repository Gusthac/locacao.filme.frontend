import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'user',
    title: 'Clientes',
    subtitle: 'Cadastro de clientes: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:52149/api/Clientes'
const initialState = {
    cliente: { nome: '', cpf: '', dataNascimento: '' },
    list: []
}

export default class ClienteCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ cliente: initialState.cliente })
    }

    save() {
        const cliente = this.state.cliente
        const method = cliente.id ? 'put' : 'post'
        const url = cliente.id ? `${baseUrl}/${cliente.id}` : baseUrl
        axios[method](url, cliente)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ cliente: initialState.cliente, list })
            })
    }

    getUpdatedList(cliente, add = true) {
        const list = this.state.list.filter(u => u.id !== cliente.id)
        if(add) list.unshift(cliente)
        return list
    }

    updateField(event) {
        const cliente = { ...this.state.cliente }
        cliente[event.target.name] = event.target.value
        this.setState({ cliente })
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                              name="nome"
                              value={this.state.cliente.nome}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                       <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                              name="cpf"
                              value={this.state.cliente.cpf}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite o CPF..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                       <div className="form-group">
                            <label>Data de Nascimento</label>
                            <input type="date" className="form-control"
                              name="dataNascimento"
                              value={this.state.cliente.dataNascimento}
                              onChange={e => this.updateField(e)}
                              placeholder="Digite a data de nascimento..." />
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

    load(cliente) {
        this.setState({ cliente })
    }

    remove(cliente) {
        axios.delete(`${baseUrl}/${cliente.id}`).then(resp => {
            const list = this.getUpdatedList(cliente, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(cliente => {
            return (
                <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.dataNascimento}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(cliente)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(cliente)}>
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
