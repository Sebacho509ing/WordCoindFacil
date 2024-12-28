import axios, { AxiosInstance } from 'axios';
import { BINANCE_APIS } from '../../config/binance';

class BinanceClient {
  private clients: AxiosInstance[];
  private currentIndex: number = 0;

  constructor() {
    this.clients = BINANCE_APIS.map(baseURL => 
      axios.create({
        baseURL,
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      })
    );
  }

  private async executeWithFailover<T>(
    request: (client: AxiosInstance) => Promise<T>
  ): Promise<T> {
    const initialIndex = this.currentIndex;
    
    do {
      try {
        const result = await request(this.clients[this.currentIndex]);
        return result;
      } catch (error) {
        this.currentIndex = (this.currentIndex + 1) % this.clients.length;
        
        if (this.currentIndex === initialIndex) {
          throw new Error('All Binance APIs failed');
        }
      }
    } while (true);
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    return this.executeWithFailover(client => 
      client.get(endpoint, { params }).then(response => response.data)
    );
  }
}

export const binanceClient = new BinanceClient();