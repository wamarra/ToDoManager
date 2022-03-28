import * as React from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Animated,
} from 'react-native';
import {signInOnFirebaseAsync} from '../services/FirebaseApi';
import {CommonActions} from '@react-navigation/native';

const img = require('../assets/check.png');

const Login = props => {
  const [email, setEmail] = React.useState(props.email);
  const [password, setPassword] = React.useState('');
  const [opacity, setOpacity] = React.useState(new Animated.Value(0));

  const translation = React.useRef(new Animated.Value(100000)).current;

  const imageOpacity = {
    opacity: opacity,
    transform: [
      {
        scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  const translateContent = {
    transform: [
      {
        translateY: translation.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  const onLoad = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const signIn = React.useCallback(() => {
    signInOnFirebaseAsync(email, password)
      .then(() => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'TaskList'}],
          }),
        );
      })
      .catch(error => {
        Alert.alert('Login Failed', error.message);
      });
  }, [email, password, props.navigation]);

  React.useEffect(() => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setOpacity(actual => actual ?? new Animated.Value(0));
  }, [translation]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Animated.Image
          onLoad={onLoad}
          style={[imageOpacity, styles.img]}
          source={img}
        />
      </View>
      <Animated.View style={[translateContent, styles.bottomView]}>
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
          title="Sign In"
          onPress={signIn}
        />
        <View style={styles.textConteiner}>
          <Text style={styles.textNotMember}>Not a member? Let's </Text>
          <Text
            style={styles.textRegister}
            onPress={() => {
              props.navigation.navigate('Register');
            }}>
            Register
          </Text>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textNotMember: {
    color: '#69757e',
  },
  textRegister: {
    color: '#69757e',
    fontWeight: 'bold',
  },
});

export default Login;
