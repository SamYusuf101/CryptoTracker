import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    title: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom:3
    },
    text: {
      color: 'white',
      marginRight:5,
    },
    rank:{
      fontWeight:'bold',
      color:'white',
      marginRight:5,
      backgroundColor:'grey',
      paddingHorizontal:4,
      borderRadius:5
      
    },
    coinContainer:{
      flexDirection:'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor:'#282828',
      padding:5,
    
    }
  });

  export default styles;