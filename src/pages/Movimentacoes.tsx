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

  const getNomeProduto = (produtoId: number) => {
    const prod = produtos.find(p => p.id === produtoId);
    return prod?.nome || 'Produto não encontrado';
  };

  const closeModal = () => {
    setShowModal(false);
    setEditando(null);
    setForm({ produtoId: 0, quantidade: 0, tipo: 'ENTRADA' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let response;
      if (editando) {
        response = await updateMovimentacao(editando.id!, form);
      } else {
        response = await addMovimentacao(form);
      }
      
      // Verifica se há aviso na mensagem
      if (response.message?.includes('AVISO')) {
        setSuccess(response.message);
      } else {
        setSuccess(editando ? 'Movimentação atualizada com sucesso!' : 'Movimentação registrada com sucesso!');
      }
      
      closeModal();
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar movimentação');
    }
  };

  const handleEdit = (mov: Movimentacao) => {
    setEditando(mov);
    setForm({
      produtoId: mov.produtoId,
      quantidade: mov.quantidade,
      tipo: mov.tipo
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover esta movimentação? O estoque será revertido.')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await deleteMovimentacao(id);
      setSuccess('Movimentação removida com sucesso!');
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao remover movimentação');
    }
  };

  const openModal = () => {
    setEditando(null);
    setForm({ produtoId: 0, quantidade: 0, tipo: 'ENTRADA' });
    setShowModal(true);
  };

  return (
    <div>
      <h2>Movimentações</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
