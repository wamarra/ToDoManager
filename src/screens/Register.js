import * as React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import {createUserOnFirebaseAsync} from '../services/FirebaseApi';

const img = require('../assets/check.png');

const Register = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const createUser = React.useCallback(() => {
    createUserOnFirebaseAsync(email, password)
      .then(user => {
        Alert.alert(
          'User Created',
          `User ${user.email} has succesfuly been created!`,
          [
            {
              text: 'Ok',
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ],
        );
      })
      .catch(error => {
        Alert.alert('Create User Failed!', error.message);
      });
  }, [email, password, props.navigation]);

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.topView}>
          <Image style={styles.img} source={img} />
          <Text style={styles.title}>Registering new user</Text>
        </View>
        <View style={styles.bottomView}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            keyboardType={'email-address'}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button
            color={Platform.OS === 'android' && '#2e5780'}
            title="Register User"
            onPress={createUser}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

Register.navigationOptions = () => ({
  title: 'Register',
});

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#69757e',
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default Register;
