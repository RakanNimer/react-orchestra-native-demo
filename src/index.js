import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Note } from 'react-orchestra/native';


import OrchestraExample from './orchestra-example';
import SvgShape from './SvgShape';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playMelody = this.playMelody.bind(this);
  }
  async playMelody() {
    this.setState({ playA: true });
    await delay(1000);
    this.setState({ playC: true, playA: false });
    await delay(1000);
    this.setState({ playC: false });
  }
  render() {
    return (
      <OrchestraExample />
    );
  }
}
export default Demo;
