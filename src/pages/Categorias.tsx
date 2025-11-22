import { useState, useEffect } from 'react';
import { getCategorias, addCategoria, updateCategoria, deleteCategoria } from '../services/api';
import type { Categoria } from '../types';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [form, setForm] = useState<Categoria>({
    nome: '',
    tamanho: '',
    embalagem: ''
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      setError('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingCategoria?.id) {
        await updateCategoria(editingCategoria.id, form);
        setSuccess('Categoria atualizada com sucesso!');
      } else {
        await addCategoria(form);
        setSuccess('Categoria adicionada com sucesso!');
      }
      setShowModal(false);
      setForm({ nome: '', tamanho: '', embalagem: '' });
      setEditingCategoria(null);
      loadCategorias();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar categoria');
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setForm({
      nome: categoria.nome,
      tamanho: categoria.tamanho,
      embalagem: categoria.embalagem
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta categoria?')) return;

    try {
      setError('');
      await deleteCategoria(id);
      setSuccess('Categoria removida com sucesso!');
      loadCategorias();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao remover categoria');
    }
  };

  const openNewModal = () => {
    setEditingCategoria(null);
    setForm({ nome: '', tamanho: '', embalagem: '' });
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="card">
      <h2>📁 Categorias</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="btn btn-primary" onClick={openNewModal}>
        + Nova Categoria
      </button>

      {categorias.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma categoria cadastrada</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Embalagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nome}</td>
                <td>{cat.tamanho}</td>
                <td>{cat.embalagem}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-warning" onClick={() => handleEdit(cat)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(cat.id!)}>
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
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tamanho</label>
                <input
                  type="text"
                  value={form.tamanho}
                  onChange={(e) => setForm({ ...form, tamanho: e.target.value })}
                  placeholder="Ex: Grande, Médio, Pequeno"
                />
              </div>
              <div className="form-group">
                <label>Embalagem</label>
                <input
                  type="text"
                  value={form.embalagem}
                  onChange={(e) => setForm({ ...form, embalagem: e.target.value })}
                  placeholder="Ex: Caixa, Saco, Lata"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
