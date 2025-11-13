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
  
  return (
    <div>
      <h2>Categorias</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
