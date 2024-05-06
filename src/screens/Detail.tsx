import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect,useState} from 'react';
import { View, Text} from 'react-native';
import Toast from 'react-native-toast-message';

const Detail = () => { 
  
    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
      });
    };
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      showToast();
      //getToken from local storage
      const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            setToken(value);
          }
        } catch (e) {
          console.log('Failed to fetch the token from storage');
        }
      };
      getToken();

    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        {token && <Text>Token: {token}</Text>}
        
      </View>
    );  
};

export default Detail; 