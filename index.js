import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import Routes from './src/routes/Routes';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {initializeFirebaseApi} from './src/services/FirebaseApi';

const wrappedRoutes = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => {
  initializeFirebaseApi();
  return wrappedRoutes;
});
