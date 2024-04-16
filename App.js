import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/providers/AuthProvider';
import { ProductProvider } from './src/providers/ProductProvider';
import { CartProvider } from './src/providers/CartProvider';
import { OrdersProvider } from './src/providers/OrdersProvider';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#705DAD'} />
      <AuthProvider>
          <CartProvider>
            <OrdersProvider>
              <NavigationContainer>              
                  <ProductProvider>
                        <DrawerNavigator/>
                  </ProductProvider>              
              </NavigationContainer>
            </OrdersProvider>
          </CartProvider>
      </AuthProvider>
    </>
  );
}

