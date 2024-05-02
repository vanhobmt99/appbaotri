import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/types'; 
import { GlobalContext } from '../store/GlobalProvider';
import Toast from 'react-native-toast-message';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => { 

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const base_url  = React.useContext(GlobalContext).url;  

  const onPress = async () => {
    try {
         
      const response = await fetch(base_url +'api/CMMSBT/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Tên đăng nhập hoặc mật khẩu chưa chính xác!'
        });
      }
    } catch (error) {
      console.error('There was an error!', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi trong khi đăng nhập. Vui lòng thử lại!'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ĐĂNG NHẬP HỆ THỐNG</Text>
      <Text style={styles.label}>Tên đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"       
        autoCapitalize="none"       
        onChangeText={text => setUserName(text)}
      />
      <Text style={styles.label}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  logo: {
    fontSize: 30,
    marginBottom: 30,
    color: 'blue',
    fontWeight: 'bold',
  }, 
  button: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },  
});

export default Login;