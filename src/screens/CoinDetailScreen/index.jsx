import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CoinDetailHeader from './components/CoinDetailHeader';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getDetailCoinData, getCoinMarketChart } from '../../services/request';
import { LineChart } from 'react-native-wagmi-charts';
import FilterComponent from './components/filterComponent';

const CoinDetailScreen = () => {
    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null);
    const route = useRoute();
    const { params: { coinId } } = route;
    const [loading, setLoading] = useState(false);
    const [coinValue, setCoinValue] = useState("1");
    const [usdValue, setUsdValue] = useState("");
    const [selectedRange, setselectedRange] = useState("1");

    const fetchCoinData = async () => {
        setLoading(true);
        const fetchedCoinData = await getDetailCoinData(coinId);
        
        setCoin(fetchedCoinData)
        
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString())
        setLoading(false);
    };

    const fetchMarketCoinData=async (selectedRangeValue) => {
        const fetchedCoinMarketData = await getCoinMarketChart(coinId, selectedRangeValue);
        setCoinMarketData(fetchedCoinMarketData);
        

    } ;

    useEffect(() => {
        fetchCoinData()
        fetchMarketCoinData(1);

    }, [])

    if (loading || !coin || !coinMarketData) {
        return <ActivityIndicator size="large" />
    }
    const {
        id,
        image: { small },
        name,
        symbol,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h,
        },
    } = coin;

    const { prices } = coinMarketData;

    const percentageColor =
        price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white';

    const changeCoinValue = (value) => {
        setCoinValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setUsdValue((floatValue * current_price.usd).toString())

    };
    const changeUsdValue = (value) => {
        setUsdValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setCoinValue((floatValue / current_price.usd).toString())
    };

    const onSelectedRangeChange = (selectedRangeValue) => {
        setselectedRange(selectedRangeValue);
        fetchMarketCoinData(selectedRangeValue);
    }



    return (
        <View style={{ paddingHorizontal: 10 }}>
            <LineChart.Provider data={prices.map(([timestamp, value]) => ({timestamp, value}))}>
                <CoinDetailHeader
                    coinId={id}
                    image={small}
                    symbol={symbol}
                    marketCapRank={market_cap_rank}
                />
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.curretPrice}>${current_price.usd}</Text>
                    </View>
                    <View style={{
                        backgroundColor: percentageColor,
                        padding: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 3,
                        borderRadius: 5,
                        flexDirection: 'row'
                    }}>

                        <AntDesign
                            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'} size={12}
                            color={'white'}
                            style={{
                                alignSelf: 'center',
                                marginRight: 5
                            }}
                        />
                        <Text style={styles.priceChange}>
                            {price_change_percentage_24h?.toFixed(2)}%
                        </Text>
                    </View>                 

                </View>
                <View style= {styles.filtersContainer}>
                <FilterComponent filterDay="1" filterText="24h" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}/>
                <FilterComponent filterDay="7" filterText="7d"   selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}/>
                <FilterComponent filterDay="30" filterText="30d"  selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}/>
                <FilterComponent filterDay="365" filterText="1y"  selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}/>
                <FilterComponent filterDay="max" filterText="All"  selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}/>

             
             </View>

                <LineChart height= {150} >
                    <LineChart.Path color='red'/>
                    <LineChart.CursorCrosshair/>
                </LineChart>

                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>{symbol.toUpperCase()}</Text>
                        <TextInput
                            style={styles.input}
                            value={coinValue}
                            keyboardType="numeric"
                            onChangeText={changeCoinValue}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>USD</Text>
                        <TextInput
                            style={styles.input}
                            value={usdValue}
                            keyboardType="numeric"
                            onChangeText={changeUsdValue}
                        />

                    </View>
                </View>
            </LineChart.Provider>
        </View>


    );

};

export default CoinDetailScreen;