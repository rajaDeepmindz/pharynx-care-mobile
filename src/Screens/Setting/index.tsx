import React from 'react';
import {Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import commonFonts from '../../Utils/Fonts/Fonts';

const Settings = () => {
  return (
    <SafeAreaView
      style={{
        height: '90%',
        width: '95%',
        alignSelf: 'center',
        borderWidth: 1,
        overflow: 'scroll',
      }}>
      <ScrollView>
        <Text style={styles.text}>Product Screen</Text>
        <Text style={styles.text1}>Product Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  text: {
    fontFamily: commonFonts.italic,
    fontSize: 20,
    backgroundColor: 'yellow',
    height: 1000,
  },
  text1: {
    fontFamily: commonFonts.italic,
    fontSize: 20,
    backgroundColor: 'green',
    height: 1000,
  },
});
