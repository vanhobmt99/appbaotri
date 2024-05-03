import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const Detail = () => { 
  
    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
      });
    };
  
    useEffect(() => {
      showToast();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        
      </View>
    );  
};

export default Detail; 