import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Routes from './src/routes/Routes';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {initializeFirebaseApi} from './src/services/FirebaseApi';

const WrappedRoutes = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.statusbar} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  statusbar: {
    flex: 0,
    backgroundColor: '#2e5780',
  },
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => {
  initializeFirebaseApi();
  return WrappedRoutes;
});
