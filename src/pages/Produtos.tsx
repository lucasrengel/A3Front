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
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAjusteModal, setShowAjusteModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [percentual, setPercentual] = useState<number>(0);
  const [form, setForm] = useState<Produto>({
    nome: '',
    precoUnitario: 0,
    unidade: '',
    quantidadeEstoque: 0,
    quantidadeMinima: 0,
    quantidadeMaxima: 0,
    categoriaId: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [produtosData, categoriasData] = await Promise.all([
        getProdutos(),
        getCategorias()
      ]);
      setProdutos(produtosData);
      setCategorias(categoriasData);
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const getNomeCategoria = (categoriaId: number) => {
    const cat = categorias.find(c => c.id === categoriaId);
    return cat?.nome || 'N/A';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingProduto?.id) {
        await updateProduto(editingProduto.id, form);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        await addProduto(form);
        setSuccess('Produto adicionado com sucesso!');
      }
      setShowModal(false);
      resetForm();
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar produto');
    }
  };

  const handleAjustePrecos = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await ajustarPrecos(percentual);
      setSuccess(`Preços ajustados em ${percentual}%`);
      setShowAjusteModal(false);
      setPercentual(0);
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao ajustar preços');
    }
  };

  const handleEdit = (produto: Produto) => {
    setEditingProduto(produto);
    setForm({
      nome: produto.nome,
      precoUnitario: produto.precoUnitario,
      unidade: produto.unidade,
      quantidadeEstoque: produto.quantidadeEstoque,
      quantidadeMinima: produto.quantidadeMinima,
      quantidadeMaxima: produto.quantidadeMaxima,
      categoriaId: produto.categoriaId
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este produto?')) return;

    try {
      setError('');
      await deleteProduto(id);
      setSuccess('Produto removido com sucesso!');
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao remover produto');
    }
  };

  const resetForm = () => {
    setEditingProduto(null);
    setForm({
      nome: '',
      precoUnitario: 0,
      unidade: '',
      quantidadeEstoque: 0,
      quantidadeMinima: 0,
      quantidadeMaxima: 0,
      categoriaId: categorias.length > 0 ? categorias[0].id! : 0
    });
  };

  const openNewModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div>
      <h2>Produtos</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
