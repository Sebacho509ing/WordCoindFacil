export interface CoinbaseAccount {
  id: string;
  name: string;
  balance: {
    amount: string;
    currency: string;
  };
  type: string;
  primary: boolean;
  active: boolean;
}

export interface CoinbaseTransaction {
  id: string;
  type: 'send' | 'receive' | 'buy' | 'sell';
  status: 'pending' | 'completed' | 'failed';
  amount: {
    amount: string;
    currency: string;
  };
  native_amount: {
    amount: string;
    currency: string;
  };
  created_at: string;
  updated_at: string;
  details: {
    title: string;
    subtitle: string;
  };
}

export interface CoinbaseAddress {
  id: string;
  address: string;
  name: string;
  created_at: string;
  updated_at: string;
  network: string;
  uri_scheme: string;
}