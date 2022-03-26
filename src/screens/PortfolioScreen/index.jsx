import React, {Suspense}from 'react';
import { View, Text } from 'react-native';
import PortfolioAssetList from './components/PortfolioAssetList';

const PortfolioScreen = () => {
return (
    <View style={{flex:1}}>
    <Suspense fallback={<Text style={{color:'white'}}>Loading Please Wait</Text>}>
    <PortfolioAssetList />
    </Suspense>
    </View>

);

};

export default PortfolioScreen;