import React, {useEffect, useState} from "react";
import CoinItem from '../../component/coinItem/Index';
import { FlatList, RefreshControl, View, Text } from "react-native";
import {getMarketData} from '../../services/request';

const HomeScreen = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async(pageNumber) =>{
        if (loading) {
            return;
        }
       setLoading(true);
       const coinsData=await getMarketData(pageNumber)
       setCoins((existingCoins) => ([...existingCoins, ...coinsData]))
       setLoading(false);
    }

    const refetchCoins = async() =>{
        if (loading) {
            return;
        }
        setLoading(true);
       const coinsData=await getMarketData()
       setCoins(coinsData)
       setLoading(false);

    }

    useEffect(() => {
        fetchCoins()

    }, [])
    return(
        
        <View>
        <View style= {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginRight:3 }}>
        <Text style={{fontFamily: 'DroidSans', 
        color:'white', fontSize:18, 
        letterSpacing:1,
        paddingHorizontal:20, 
        paddingBottom:6}}>Cryptoassets</Text>
        <Text style={{fontFamily: 'DroidSans', 
        color:'lightgrey', fontSize:10, 
        letterSpacing:1,
        paddingHorizontal:20, 
        paddingBottom:6}}>powered by CoinGecko</Text>
        </View>
        <FlatList
            data={coins}
            renderItem={({ item }) => <CoinItem marketCoin={item} />}
            onEndReached={() =>fetchCoins((coins.length / 50) + 1)}
            refreshControl={
               < RefreshControl
                  refreshing={loading}
                  tintColor="white"
                  onRefresh={refetchCoins}
               />
            }
           />
        
            </View>
        
       

    );

};
export default  HomeScreen;