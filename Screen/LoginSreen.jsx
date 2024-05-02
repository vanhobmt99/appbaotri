import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    fontweight: 'bold',

  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onPress = () => {
    // if (email === 'admin' && password === 'admin') {
    //   navigation.navigate('DetailsScreen');
    // } else {
    //   alert('Email or Password is incorrect');
    // }


    //make a request to the server with username and password to get the token if return 200 then navigate to the details screen
    fetch('http://api-biwase.us-east-2.elasticbeanstalk.com/api/CMMSBT/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('DetailsScreen');
        } else {
          alert('Email or Password is incorrect');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <Text style={styles.label}>UserName</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="username"
        autoCapitalize="none"
        onChangeText={text => setUserName(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        />
      <Button title="Login" style={styles.button} onPress={onPress}/>
    </View>
  );
};


export default Login;