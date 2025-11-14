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

  const getEstoqueStatus = (produto: Produto) => {
    if (produto.quantidadeEstoque < produto.quantidadeMinima) {
      return <span style={{ color: 'red', fontWeight: 'bold' }}>Abaixo do Mínimo</span>;
    }
    if (produto.quantidadeEstoque > produto.quantidadeMaxima) {
      return <span style={{ color: 'orange', fontWeight: 'bold' }}>Acima do Máximo</span>;
    }
    return <span style={{ color: 'green', fontWeight: 'bold' }}>Normal</span>;
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Produtos</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={openNewModal} style={{ marginRight: '10px' }}>
          + Novo Produto
        </button>
        <button onClick={() => setShowAjusteModal(true)}>
          Ajustar Preços
        </button>
      </div>

      {showModal && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', background: '#f9f9f9' }}>
          <h3>{editingProduto ? 'Editar Produto' : 'Novo Produto'}</h3>
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
              <label>Preço Unitário (R$):</label>
              <input
                type="number"
                step="0.01"
                value={form.precoUnitario}
                onChange={e => setForm({ ...form, precoUnitario: parseFloat(e.target.value) || 0 })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Unidade:</label>
              <input
                type="text"
                value={form.unidade}
                onChange={e => setForm({ ...form, unidade: e.target.value })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Categoria:</label>
              <select
                value={form.categoriaId}
                onChange={e => setForm({ ...form, categoriaId: parseInt(e.target.value) })}
                required
                style={{ display: 'block', width: '100%' }}
              >
                <option value={0}>Selecione...</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Quantidade em Estoque:</label>
              <input
                type="number"
                value={form.quantidadeEstoque}
                onChange={e => setForm({ ...form, quantidadeEstoque: parseInt(e.target.value) || 0 })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Quantidade Mínima:</label>
              <input
                type="number"
                value={form.quantidadeMinima}
                onChange={e => setForm({ ...form, quantidadeMinima: parseInt(e.target.value) || 0 })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Quantidade Máxima:</label>
              <input
                type="number"
                value={form.quantidadeMaxima}
                onChange={e => setForm({ ...form, quantidadeMaxima: parseInt(e.target.value) || 0 })}
                required
                style={{ display: 'block', width: '100%' }}
              />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>Cancelar</button>
          </form>
        </div>
      )}

      {showAjusteModal && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', background: '#f9f9f9' }}>
          <h3>Ajustar Preços</h3>
          <form onSubmit={handleAjustePrecos}>
            <div style={{ marginBottom: '10px' }}>
              <label>Percentual de Ajuste (%):</label>
              <input
                type="number"
                step="0.01"
                value={percentual}
                onChange={e => setPercentual(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 10 para aumentar 10%, -5 para diminuir 5%"
                required
                style={{ display: 'block', width: '100%' }}
              />
              <small>Use valores positivos para aumentar e negativos para diminuir</small>
            </div>
            <button type="submit">Aplicar Ajuste</button>
            <button type="button" onClick={() => setShowAjusteModal(false)} style={{ marginLeft: '10px' }}>Cancelar</button>
          </form>
        </div>
      )}

      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Unidade</th>
            <th>Estoque</th>
            <th>Min/Max</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nome}</td>
              <td>R$ {prod.precoUnitario.toFixed(2)}</td>
              <td>{prod.unidade}</td>
              <td>{prod.quantidadeEstoque}</td>
              <td>{prod.quantidadeMinima} / {prod.quantidadeMaxima}</td>
              <td>{getNomeCategoria(prod.categoriaId)}</td>
              <td>{getEstoqueStatus(prod)}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Editar</button>
                <button onClick={() => prod.id && handleDelete(prod.id)} style={{ marginLeft: '5px', color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
