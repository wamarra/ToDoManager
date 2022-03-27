import * as React from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {writeTaskOnFirebaseAsync} from '../services/FirebaseApi';

const Task = props => {
  const [key, setKey] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [resume, setResume] = React.useState('');
  const [priority, setPriority] = React.useState(true);
  const [isDone, setIsDone] = React.useState(false);

  const saveTask = React.useCallback(() => {
    if (!title) {
      Alert.alert('Erro Saving', 'Title is required');
      return;
    }
    if (!resume) {
      Alert.alert('Erro Saving', 'resume is required');
      return;
    }

    writeTaskOnFirebaseAsync({key, title, resume, priority, isDone})
      .then(() => props.navigation.goBack())
      .catch(error => Alert.alert('Erro Saving', error.message));
  }, [isDone, key, priority, props.navigation, resume, title]);

  React.useEffect(() => {
    if (props?.route?.params) {
      const {task} = props?.route?.params;
      setKey(task.key);
      setTitle(task.title);
      setResume(task.resume);
      setPriority(task.priority);
      setIsDone(task.isDone);
    }
  }, [props?.route?.params]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Resume"
        multiline={true}
        numberOfLines={4}
        value={resume}
        onChangeText={setResume}
      />
      <View style={styles.switchContainer}>
        <Switch
          value={priority}
          onValueChange={setPriority}
          trackColor={{true: '#2e5780', false: 'gray'}}
        />
        <Text style={styles.switchText}>Hight Priority</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={isDone}
          onValueChange={setIsDone}
          trackColor={{true: '#2e5780', false: 'gray'}}
        />
        <Text style={styles.switchText}>Is Done?</Text>
      </View>
      <Button style={styles.button} title="Save" onPress={saveTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  multilineInput: {
    height: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    color: '#69757e',
    fontSize: 18,
  },
});

export default Task;
