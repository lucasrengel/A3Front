import { useState, useEffect } from 'react';
import { getMovimentacoes, getProdutos, addMovimentacao, updateMovimentacao, deleteMovimentacao } from '../services/api';
import type { Movimentacao, Produto } from '../types';

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<Movimentacao | null>(null);
  const [form, setForm] = useState<Movimentacao>({
    produtoId: 0,
    quantidade: 0,
    tipo: 'ENTRADA'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [movData, prodData] = await Promise.all([
        getMovimentacoes(),
        getProdutos()
      ]);
      setMovimentacoes(movData);
      setProdutos(prodData);
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Movimentações</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
