import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import { useWatchlist } from '../../context/WatchlistContext';
import CoinItem from '../../component/coinItem/Index';
import { getWatchlistedCoins } from '../../services/request';

const WatchListScreen = () => {
    const {watchlistCoinIds} = useWatchlist()
    
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const transformCoinIds = () => watchlistCoinIds.join('%2c')
    
    const fetchWatchlistedCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
        setCoins(watchlistedCoinsData);
        setLoading(false);

    };
    
    useEffect(() => {
        if (watchlistCoinIds.length > 0) {
            fetchWatchlistedCoins();
        }
        
    }, [watchlistCoinIds]);


    return (
        <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        refreshControl={
            <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null}
            />
        }
        />
    )
};

export default WatchListScreen;