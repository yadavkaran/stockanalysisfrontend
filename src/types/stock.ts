export interface StockPrice {
    symbol: string;
    price: number;
    volume: number;
    change: number;
    changePercent: number;
    timestamp: string;
    high: number;
    low: number;
    open: number;
    previousClose: number;
}

export interface TrendAnalysis {
    symbol: string;
    timeframe: string;
    trend: string;
    strength: number;
}

export interface VolatilityAnalysis {
    symbol: string;
    timeframe: string;
    volatility: number;
    risk_level: string;
}

export interface MovingAverages {
    symbol: string;
    short_ma: number;
    long_ma: number;
    signal: string;
}

export interface VolumeAnalysis {
    symbol: string;
    timeframe: string;
    average_volume: number;
    volume_trend: string;
}

export interface TechnicalIndicators {
    symbol: string;
    rsi: number;
    macd: number;
    signal: string;
} 