import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
// import ResultScreen from '../Result'; // Import the ResultScreen component

const AboutScreen = () => {
  // Sample response data, replace with actual response data
  // const responseData = {
  //   data: '{"res": "None", "global_score": 0, "lsff": 0, "lslc": 0, "lsrc": 0, "fn": 0, "fpu": 0, "fpa": 0, "fc": 0, "nn": 0, "npu": 0, "npa": 0, "nc": 0, "cn": 0, "cpu": 0, "cpa": 0, "cc": 0, "ln": 0, "lpu": 0, "lpa": 0, "lc": 0, "rn": 0, "rpu": 0, "rpa": 0, "rc": 0, "skin_tone": "Face not detected", "dark_circle": {"time": 0.030893819000084477, "image": {"width": 416, "height": 191}, "predictions": []}, "dark_circle_severity": "None", "wrinkle_pred": {"g_wrinkle_forehead": 39.87, "g_wrinkle_eye": 30.06, "g_wrinkle_smileline": 7.48, "g_pore": 3.4299999999999997, "a_wrinkle_forehead": 3.36, "f_wrinkle_forehead": 2.68, "a_pigmentation": 2.42, "f_pore": 2.4, "g_pigmentation": 2.2800000000000002, "a_pore": 2.0500000000000003, "f_pigmentation": 2.02, "a_wrinkle_eye": 1.95}, "Name": "R", "patientAge": "23", "gender": "Male"}',
  //   pdfpath: null,
  //   status: 200,
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ResultScreen data={JSON.parse(responseData.data)} />{' '} */}
      <Text>About Screen</Text>
      {/* Pass response data as props */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutScreen;
