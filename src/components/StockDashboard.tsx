import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    Card,
    CardContent,
} from '@mui/material';
import { stockService } from '../services/stockService';
import {
    TrendAnalysis,
    VolatilityAnalysis,
    MovingAverages,
    VolumeAnalysis,
    TechnicalIndicators,
} from '../types/stock';

const StockDashboard: React.FC = () => {
    const [symbol, setSymbol] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [trend, setTrend] = useState<TrendAnalysis | null>(null);
    const [volatility, setVolatility] = useState<VolatilityAnalysis | null>(null);
    const [movingAverages, setMovingAverages] = useState<MovingAverages | null>(null);
    const [volume, setVolume] = useState<VolumeAnalysis | null>(null);
    const [technical, setTechnical] = useState<TechnicalIndicators | null>(null);

    const fetchAnalysis = async () => {
        if (!symbol) return;
        setLoading(true);
        try {
            const [trendData, volatilityData, maData, volumeData, technicalData] = await Promise.all([
                stockService.getTrendAnalysis(symbol),
                stockService.getVolatilityAnalysis(symbol),
                stockService.getMovingAverages(symbol),
                stockService.getVolumeAnalysis(symbol),
                stockService.getTechnicalIndicators(symbol),
            ]);
            setTrend(trendData);
            setVolatility(volatilityData);
            setMovingAverages(maData);
            setVolume(volumeData);
            setTechnical(technicalData);
        } catch (error) {
            console.error('Error fetching analysis:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Stock Analysis Dashboard
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <TextField
                        label="Stock Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        placeholder="Enter stock symbol (e.g., AAPL)"
                    />
                    <Button
                        variant="contained"
                        onClick={fetchAnalysis}
                        disabled={loading || !symbol}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Analyze'}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {trend && (
                    <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Trend Analysis</Typography>
                                <Typography>Trend: {trend.trend}</Typography>
                                <Typography>Strength: {(trend.strength * 100).toFixed(1)}%</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {volatility && (
                    <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Volatility Analysis</Typography>
                                <Typography>Volatility: {(volatility.volatility * 100).toFixed(1)}%</Typography>
                                <Typography>Risk Level: {volatility.risk_level}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {movingAverages && (
                    <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Moving Averages</Typography>
                                <Typography>Short MA: {movingAverages.short_ma.toFixed(2)}</Typography>
                                <Typography>Long MA: {movingAverages.long_ma.toFixed(2)}</Typography>
                                <Typography>Signal: {movingAverages.signal}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {volume && (
                    <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Volume Analysis</Typography>
                                <Typography>Average Volume: {volume.average_volume.toLocaleString()}</Typography>
                                <Typography>Volume Trend: {volume.volume_trend}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {technical && (
                    <Box sx={{ flex: '1 1 100%', minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Technical Indicators</Typography>
                                <Typography>RSI: {technical.rsi.toFixed(2)}</Typography>
                                <Typography>MACD: {technical.macd.toFixed(2)}</Typography>
                                <Typography>Signal: {technical.signal}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default StockDashboard; 