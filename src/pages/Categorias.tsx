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
  
  return (
    <div>
      <h2>Categorias</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
