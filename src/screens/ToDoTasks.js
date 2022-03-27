import * as React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import TaskListView from '../components/TaskListView';
import {readTasksFromFirebaseAsync} from '../services/FirebaseApi';

const imgPlus = require('../assets/plus.png');

const ToDoTasks = ({navigation}) => {
  const [tasks, setTasks] = React.useState([]);

  const goToTask = React.useCallback(
    () => navigation.navigate('Task'),
    [navigation],
  );

  const fetchTasks = React.useCallback(
    items => setTasks(items.filter(t => !t.isDone)),
    [],
  );

  React.useEffect(() => {
    readTasksFromFirebaseAsync(fetchTasks);
  }, [fetchTasks]);

  return (
    <View style={styles.container}>
      <TaskListView tasks={tasks} navigation={navigation} />
      <TouchableOpacity style={styles.floatButton} onPress={goToTask}>
        <Image source={imgPlus} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 50,
    height: 50,
  },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default ToDoTasks;
