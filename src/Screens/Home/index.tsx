import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import commonFonts from '../../Utils/Fonts/Fonts';
import Form from '../../Component/Form';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{height: '90%', width: '100%'}}>
      <Text style={styles.text}>Home Screen</Text>
      <Form />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: commonFonts.italic,
    fontSize: 20,
  },
});
