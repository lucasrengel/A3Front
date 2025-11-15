import { useState, useEffect } from 'react';
import { getMovimentacoes, getProdutos, addMovimentacao, updateMovimentacao, deleteMovimentacao } from '../services/api';
import type { Movimentacao, Produto } from '../types';

export default function Movimentacoes() {
  // Estados serão adicionados aqui

  return (
    <div>
      <h2>Movimentações</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
