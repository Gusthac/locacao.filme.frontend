import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="/Clientes">
                <i className="fa fa-user"></i> Clientes
            </a>
            <a href="/Filmes">
                <i className="fa fa-film"></i> Filmes
            </a>
            <a href="/Locacoes">
                <i className="fa fa-shopping-cart"></i> Locações
            </a>
        </nav>
    </aside>