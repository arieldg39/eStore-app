import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#f2058b'} />
      <NavigationContainer>
        <DrawerNavigator/>      
      </NavigationContainer>
    </>
  );
}

