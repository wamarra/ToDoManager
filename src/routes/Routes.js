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

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerStyle: {backgroundColor: '#2e5780'},
        headerTintColor: 'white',
      }}>
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
        tabBarIndicatorStyle: {backgroundColor: '#91a3b3'},
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
});

export default Routes;
