import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';

enableScreens();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const navOptionHandler: DrawerNavigationOptions = {
  headerStyle: {
    backgroundColor: '#05a4e4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
  // title: 'APP BẢO TRÌ THIẾT BỊ',
};

function MyDrawer({ isLogged }: { isLogged: boolean }) {
  return (
    <Drawer.Navigator initialRouteName={isLogged ? 'Home' : 'Login'}>
      <Drawer.Screen name="Home" component={Home} options={{ ...navOptionHandler, title:'TRANG CHỦ' }} />
      <Drawer.Screen name="Detail" component={Detail} options={{ ...navOptionHandler, title:'CHI TIẾT' }} />
      <Drawer.Screen name="Login" component={Login} options={{ headerShown: false, title:'THOÁT' }} />
    </Drawer.Navigator>
  );
}

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {    
    const checkLogin = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLogged(loggedIn);
    };

    checkLogin();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      return isLoggedIn === 'true';
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  };

  const storeLoginStatus = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Error storing login status:', error);
    }
  };  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Login'>
        <Stack.Screen name="Logins" options={{ headerShown: false }}>
          {(props) => <MyDrawer {...props} isLogged={isLogged} />}
        </Stack.Screen>
      </Stack.Navigator>
      <Toast />      
    </NavigationContainer>
  );
}

export default App;