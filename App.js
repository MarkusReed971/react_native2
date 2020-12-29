import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import CompanyListScreen from "./components/CompanyListScreen";
import InformationScreen from "./components/InformationScreen";
import FinanceScreen from "./components/FinanceScreen";
import {ApiContextProvider} from "./components/Context";
import FoundersScreen from "./components/FoundersScreen";
import LicensesScreen from "./components/LicensesScreen";
import PurchasesScreen from "./components/PurchasesScreen";
import AllowancesScreen from "./components/AllowancesScreen";
import TrialsScreen from "./components/TrialsScreen";
import DownloadScreen from "./components/DownloadScreen";

const MainStack = createStackNavigator();

const Main = () => {
  return(
      <MainStack.Navigator initialRouteName={'CompanyList'}>
          <MainStack.Screen
              name={'CompanyList'}
              component={CompanyListScreen}
              options={{title: 'Поиск компаний'}}
          />
          <MainStack.Screen
              name={'Company'}
              component={Company}
              options={({ route }) => ({ title: route.params.headerTitle })}
          />
      </MainStack.Navigator>
  )
};

const CompanyStack = createStackNavigator();

const Company = () => {
    return(
        <CompanyStack.Navigator initialRouteName={'Information'} screenOptions={{headerShown: false}}>
            <CompanyStack.Screen
                name={'Information'}
                component={InformationScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Finances'}
                component={FinanceScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Founders'}
                component={FoundersScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Licenses'}
                component={LicensesScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Purchases'}
                component={PurchasesScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Allowances'}
                component={AllowancesScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Trials'}
                component={TrialsScreen}
                options={{
                    animationEnabled: false,
                }}
            />
            <CompanyStack.Screen
                name={'Download'}
                component={DownloadScreen}
                options={{
                    animationEnabled: false,
                }}
            />
        </CompanyStack.Navigator>
    )
}

export default function App() {
  return (
      <ApiContextProvider>
          <NavigationContainer>
              <Main/>
          </NavigationContainer>
      </ApiContextProvider>
  );
}
