import React from 'react'
import { Routes, Route } from "react-router-dom"

import Home from '../components/home/Home'
import ClienteCrud from '../components/cliente/ClienteCrud'
import FilmeCrud from '../components/filme/FilmeCrud'

export default props =>
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/clientes" element={<ClienteCrud />} />
    <Route path="/filmes" element={<FilmeCrud />} />
    <Route path="*" element={<Home />} />
   </Routes>

