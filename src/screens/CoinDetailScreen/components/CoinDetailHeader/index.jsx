import React from "react";
import { View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome, } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from '../../../../context/WatchlistContext';

const CoinDetailHeader = (props) => {
    const { coinId, image, symbol, marketCapRank } = props;
    const navigation = useNavigation();
    const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } = useWatchlist();

    const checkIfCoinIsWatchListed = () => 
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);
    
    const handleWatchlistCoin = () => {
        if (checkIfCoinIsWatchListed()){
            return removeWatchlistCoinId(coinId)
        }
        return  storeWatchlistCoinId(coinId)
    };


    return (
        <View style={styles.headerContainer}>
            <Ionicons name="ios-chevron-back" size={30} color="white" onPress={() => navigation.goBack()} />
            <View style={styles.tickerContainer}>
                <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
                <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                    #{marketCapRank}</Text>
                </View>
            </View>
            <FontAwesome 
            name={checkIfCoinIsWatchListed() ? "star" : "star-o"} 
            size={24}
            color={checkIfCoinIsWatchListed() ? "#FFBF00" : "white"} 
            onPress={handleWatchlistCoin}
             />
        </View>

    );

};

export default CoinDetailHeader;
