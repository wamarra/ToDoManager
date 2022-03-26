import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {currentFirebaseUser} from '../services/FirebaseApi';

const App = props => {
  React.useEffect(() => {
    let routeName = 'Login';

    currentFirebaseUser()
      .then(user => {
        if (user) {
          routeName = 'TaskList';
        }
      })
      .finally(() => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routeName}],
          }),
        );
      });
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50,
  },
});

export default App;
