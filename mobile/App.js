import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! TEST</Text>
        <Image
          style={{width: 620, height: 413}}
          source={{uri: 'https://images.immediate.co.uk/volatile/sites/3/2018/03/DTT4430_v707.1023-61174bd.jpg?quality=90&resize=620,413'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
