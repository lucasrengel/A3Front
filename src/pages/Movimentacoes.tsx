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

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="card">
      <h2>🔄 Movimentações</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className={success.includes('AVISO') ? 'alert alert-warning' : 'alert alert-success'}>
          {success.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" onClick={openModal}>
        + Nova Movimentação
      </button>

      {movimentacoes.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma movimentação registrada</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.data}</td>
                <td>{getNomeProduto(mov.produtoId)}</td>
                <td>
                  <span className={`badge ${mov.tipo === 'ENTRADA' ? 'badge-success' : 'badge-danger'}`}>
                    {mov.tipo}
                  </span>
                </td>
                <td>{mov.quantidade}</td>
                <td>
                  <div className="btn-group">
                    <button 
                      className="btn btn-warning btn-sm" 
                      onClick={() => handleEdit(mov)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleDelete(mov.id!)}
                    >
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editando ? 'Editar Movimentação' : 'Nova Movimentação'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Produto</label>
                <select
                  value={form.produtoId}
                  onChange={(e) => setForm({ ...form, produtoId: parseInt(e.target.value) })}
                  required
                >
                  <option value={0}>Selecione um produto...</option>
                  {produtos.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.nome} (Estoque: {prod.quantidadeEstoque})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })}
                  required
                >
                  <option value="ENTRADA">ENTRADA</option>
                  <option value="SAIDA">SAÍDA</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade</label>
                <input
                  type="number"
                  min="1"
                  value={form.quantidade}
                  onChange={(e) => setForm({ ...form, quantidade: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editando ? 'Salvar' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
