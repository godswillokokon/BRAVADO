import React from 'react';
import {View} from 'react-native';
import List from 'components/list';
import styles from 'styles/appStyles';

const App = () => {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
};

export default App;
