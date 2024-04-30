import React, { useEffect } from 'react';
import { Text, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

enableScreens();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
    </Drawer.Navigator>
  );
}

function DetailsScreen() {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
    });
  };

  useEffect(() => {
    showToast();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      
    </View>
  );
}

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('DetailsScreen')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
      <Toast />
    </NavigationContainer>
  );
}

export default App;