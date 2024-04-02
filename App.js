import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/providers/AuthProvider';
import { ProductProvider } from './src/providers/ProductProvider';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#f2058b'} />
      <AuthProvider>
          <NavigationContainer>
            <ProductProvider>
                <DrawerNavigator/>
            </ProductProvider>
          </NavigationContainer>
      </AuthProvider>
    </>
  );
}

