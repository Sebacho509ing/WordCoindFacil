import { useState, useEffect } from 'react';
import { getCryptoDetail } from '../services/crypto/crypto.service';
import { CryptoDetailData } from '../types/crypto';

export const useCryptoDetail = (symbol: string) => {
  const [data, setData] = useState<CryptoDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const cryptoData = await getCryptoDetail(symbol);
        setData(cryptoData);
      } catch (err) {
        setError('Error al cargar los datos de la criptomoneda');
        console.error('Error in useCryptoDetail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, [symbol]);

  return { data, loading, error };
};