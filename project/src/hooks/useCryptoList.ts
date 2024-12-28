import { useState, useEffect } from 'react';
import { CryptoInfo } from '../services/crypto/types';
import { getCryptoList } from '../services/crypto/crypto.service';

export const useCryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptoList();
        setCryptoList(data);
      } catch (err) {
        setError('Error al cargar la lista de criptomonedas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  return { cryptoList, loading, error };
};