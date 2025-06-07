import axios from 'axios';
import { 
    TrendAnalysis, 
    VolatilityAnalysis, 
    MovingAverages, 
    VolumeAnalysis, 
    TechnicalIndicators 
} from '../types/stock';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const stockService = {
    getTrendAnalysis: async (symbol: string, timeframe: string = '1d'): Promise<TrendAnalysis> => {
        const response = await axios.get(`${API_BASE_URL}/analysis/trend/${symbol}?timeframe=${timeframe}`);
        return response.data;
    },

    getVolatilityAnalysis: async (symbol: string, timeframe: string = '1d'): Promise<VolatilityAnalysis> => {
        const response = await axios.get(`${API_BASE_URL}/analysis/volatility/${symbol}?timeframe=${timeframe}`);
        return response.data;
    },

    getMovingAverages: async (symbol: string, shortPeriod: number = 20, longPeriod: number = 50): Promise<MovingAverages> => {
        const response = await axios.get(`${API_BASE_URL}/analysis/moving-average/${symbol}?shortPeriod=${shortPeriod}&longPeriod=${longPeriod}`);
        return response.data;
    },

    getVolumeAnalysis: async (symbol: string, timeframe: string = '1d'): Promise<VolumeAnalysis> => {
        const response = await axios.get(`${API_BASE_URL}/analysis/volume-analysis/${symbol}?timeframe=${timeframe}`);
        return response.data;
    },

    getTechnicalIndicators: async (symbol: string, period: number = 14): Promise<TechnicalIndicators> => {
        const response = await axios.get(`${API_BASE_URL}/analysis/technical-indicators/${symbol}?period=${period}`);
        return response.data;
    }
}; 