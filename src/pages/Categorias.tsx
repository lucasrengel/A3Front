import { useState, useEffect } from 'react';
import { getCategorias, addCategoria, updateCategoria, deleteCategoria } from '../services/api';
import type { Categoria } from '../types';

export default function Categorias() {
  // Estados serão adicionados aqui
  
  return (
    <div>
      <h2>Categorias</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
