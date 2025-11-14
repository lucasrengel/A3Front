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

  return (
    <div>
      <h2>Produtos</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
