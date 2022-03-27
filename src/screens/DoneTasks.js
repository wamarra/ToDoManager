import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import TaskListView from '../components/TaskListView';
import {readTasksFromFirebaseAsync} from '../services/FirebaseApi';

const DoneTasks = props => {
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = React.useCallback(
    items => setTasks(items.filter(t => t.isDone)),
    [],
  );

  React.useEffect(() => {
    readTasksFromFirebaseAsync(fetchTasks);
  }, [fetchTasks]);

  return (
    <View style={styles.container}>
      <TaskListView tasks={tasks} navigation={props.navigation} />
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
});

export default DoneTasks;
