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
  
  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Categorias</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

      <button onClick={openNewModal} style={{ marginBottom: '20px' }}>
        + Nova Categoria
      </button>

      {showModal && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', background: '#f9f9f9' }}>
          <h3>{editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Nome:</label>
              <input
                type="text"
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Tamanho:</label>
              <input
                type="text"
                value={form.tamanho}
                onChange={e => setForm({ ...form, tamanho: e.target.value })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Embalagem:</label>
              <input
                type="text"
                value={form.embalagem}
                onChange={e => setForm({ ...form, embalagem: e.target.value })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>Cancelar</button>
          </form>
        </div>
      )}

      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
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
          {categorias.map(categoria => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>{categoria.tamanho}</td>
              <td>{categoria.embalagem}</td>
              <td>
                <button onClick={() => handleEdit(categoria)}>Editar</button>
                <button onClick={() => categoria.id && handleDelete(categoria.id)} style={{ marginLeft: '5px', color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
