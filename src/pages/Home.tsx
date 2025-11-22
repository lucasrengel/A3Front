import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias, getProdutos, getMovimentacoes } from '../services/api';
import type { Produto } from '../types';

export default function Home() {
  const [stats, setStats] = useState({
    categorias: 0,
    produtos: 0,
    movimentacoes: 0,
    valorEstoque: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [categorias, produtos, movimentacoes] = await Promise.all([
        getCategorias(),
        getProdutos(),
        getMovimentacoes()
      ]);
      
      const valorEstoque = produtos.reduce(
        (acc: number, p: Produto) => acc + (p.precoUnitario * p.quantidadeEstoque), 
        0
      );

      setStats({
        categorias: categorias.length,
        produtos: produtos.length,
        movimentacoes: movimentacoes.length,
        valorEstoque
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={loadStats}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.categorias}</h3>
          <p>Categorias</p>
        </div>
        <div className="stat-card">
          <h3>{stats.produtos}</h3>
          <p>Produtos</p>
        </div>
        <div className="stat-card">
          <h3>{stats.movimentacoes}</h3>
          <p>Movimentações</p>
        </div>
        <div className="stat-card highlight">
          <h3>R$ {stats.valorEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <p>Valor Total em Estoque</p>
        </div>
      </div>

      <div className="card">
        <h2>🚀 Acesso Rápido</h2>
        <div className="feature-grid">
          <Link to="/categorias" className="feature-card">
            <div className="icon">🏷️</div>
            <h3>Categorias</h3>
            <p>Gerencie as categorias de produtos do seu estoque</p>
          </Link>
          <Link to="/produtos" className="feature-card">
            <div className="icon">📦</div>
            <h3>Produtos</h3>
            <p>Cadastre e controle todos os produtos disponíveis</p>
          </Link>
          <Link to="/movimentacoes" className="feature-card">
            <div className="icon">🔄</div>
            <h3>Movimentações</h3>
            <p>Registre entradas e saídas do estoque</p>
          </Link>
          <Link to="/relatorios" className="feature-card">
            <div className="icon">📊</div>
            <h3>Relatórios</h3>
            <p>Visualize relatórios e análises do seu estoque</p>
          </Link>
        </div>
      </div>
    </>
  );
}
