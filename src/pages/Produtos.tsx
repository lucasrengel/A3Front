import { useState, useEffect } from 'react';
import { 
  getProdutos, 
  getCategorias, 
  addProduto, 
  updateProduto, 
  deleteProduto,
  ajustarPrecos 
} from '../services/api';
import type { Produto, Categoria } from '../types';

export default function Produtos() {
  // Estados serão adicionados aqui

  return (
    <div>
      <h2>Produtos</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
