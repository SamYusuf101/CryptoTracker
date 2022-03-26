import React from 'react';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    currentBalance: {
        color: 'white',
        fontWeight: '500',
        fontSize:15
    },
    currentBalanveValue: {
        color: 'white',
        fontWeight: '500',
        fontSize:40,
        letterSpacing:1
    },
    ValueChange: {
        color: '#16c784',
        fontWeight: '600',
        fontSize:10,

    },
    PercentageChange:{
        color: 'white',
        fontWeight: '500',
        fontSize:14,
    },
    BalanceContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 10,
        marginBottom:5,
        marginHorizontal:10,
    },
    PriceChangePercentageContainer: {
        flexDirection:'row',
        paddingHorizontal:3,
        paddingVertical:8,
        borderRadius:10,
       
    },
    AssetsLabel: {
        color: 'white',
        fontWeight: '400',
        fontSize:23,
        paddingVertical:20,
        paddingHorizontal:10
    },
    buttonContainer: {
        backgroundColor: '#4169E1',
        padding:10,
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:25,
        borderRadius:5

    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize:17,  
    }


});

export default styles;
