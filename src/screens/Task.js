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
  const [title, setTitle] = React.useState('');
  const [resume, setResume] = React.useState('');
  const [priority, setPriority] = React.useState(true);
  const [isDone, setIsDone] = React.useState(false);

  const saveTask = React.useCallback(() => {
    writeTaskOnFirebaseAsync({title, resume, priority, isDone})
      .then(() => props.navigation.goBack())
      .catch(error => Alert.alert('Erro Saving', error.message));
  }, [isDone, priority, props.navigation, resume, title]);

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
        <Switch value={priority} onValueChange={setPriority} />
        <Text style={styles.switchText}>Hight Priority</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch value={isDone} onValueChange={setIsDone} />
        <Text style={styles.switchText}>Is Done?</Text>
      </View>
      <Button style={styles.button} title="Save" onPress={saveTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    color: 'black',
    fontSize: 18,
  },
});

export default Task;
