import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [token, setToken] = useState<string | null>(null); // Thay đổi kiểu dữ liệu ban đầu của token
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    getToken();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      showToast();
    }
  }, [token]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Đăng nhập thành công',
    });
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value); // Không cần kiểm tra kiểu dữ liệu vì setToken hiện có thể nhận string
      }
    } catch (e) {
      console.log('Failed to fetch the token from storage');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {token && <Text>Token: {token}</Text>}
    </View>
  );
};

export default Home;