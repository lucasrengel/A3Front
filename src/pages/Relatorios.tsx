import { useState, useEffect } from 'react';
import { 
  getRelatorioListaPrecos, 
  getRelatorioBalanco, 
  getRelatorioAbaixoMinimo,
  getRelatorioPorCategoria,
  getRelatorioMaioresMovimentacoes,
  getProdutos
} from '../services/api';
import type { 
  RelatorioListaPreco, 
  RelatorioBalanco, 
  Produto,
  RelatorioProdutosPorCategoria,
  RelatorioMaioresMovimentacoes
} from '../types';

export default function Relatorios() {
  // Estados serão adicionados aqui

  return (
    <div>
      <h2>Relatórios</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
