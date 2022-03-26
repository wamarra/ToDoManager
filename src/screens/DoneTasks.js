import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const imgDone = require('../assets/done.png');

const DoneTasks = () => {
  return <View style={styles.container} />;
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
