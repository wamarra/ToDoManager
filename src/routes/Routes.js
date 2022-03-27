import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  App,
  Login,
  Register,
  ToDoTasks,
  DoneTasks,
  Task,
} from '../screens/Screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-ionicons';
import {signOutFirebaseAsync} from '../services/FirebaseApi';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Routes = () => {
  const signOut = React.useCallback(
    navigation => (
      <Icon
        style={styles.icon}
        ios="log-out"
        android="md-log-out"
        size={24}
        color="#fff"
        onPress={() => {
          signOutFirebaseAsync();
          navigation.navigate('Login');
        }}
      />
    ),
    [],
  );

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerMode: 'screen',
        headerStyle: {backgroundColor: '#2e5780'},
        headerTintColor: 'white',
        headerRight: () => signOut(navigation),
      })}>
      <Stack.Screen name="App" component={App} options={{headerShown: false}} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="TaskList" component={TaskTab} />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  );
};

export const TaskTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.container}
      screenOptions={() => ({
        tabBarItemStyle: {backgroundColor: '#bdcdd9'},
        tabBarIndicatorStyle: {color: '#2e5780'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#91a3b3',
      })}>
      <Tab.Screen name="To Do" component={ToDoTasks} />
      <Tab.Screen name="Done" component={DoneTasks} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  icon: {
    paddingRight: 20,
  },
});

export default Routes;
