/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
// import {atob} from 'base-64';
// import RNFS from 'react-native-fs';
// import {LineChart} from 'react-native-chart-kit';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  Button,
} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import ResultScreen from '../../Screens/Result';
// import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = () => {
  const [loading, setLoading] = useState(false); // Define loading state variable
  const [patientRegNo, setPatientRegNo] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientSex, setPatientSex] = useState('Male');
  const [frontFaceImage, setFrontFaceImage] = useState(null);
  const [leftFaceImage, setLeftFaceImage] = useState(null);
  const [rightFaceImage, setRightFaceImage] = useState(null);
  const [allFaceImages, setAllFaceImages] = useState([]);
  const [apiHit, setApiHit] = useState(false);
  const [responseData, setResponseData] = useState({});
  //   const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async (_previousResult: string | undefined) => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    // Assuming checkCameraPermission is meant to be recursive, otherwise this line needs to be modified
    // checkCameraPermission(result); // Fixed, but check the intention
  };

  const launchCameraForFront = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1,
      base64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setFrontFaceImage(source);
        setAllFaceImages([...allFaceImages, source]);
      }
    });
  };

  const launchCameraForLeft = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1,
      base64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setLeftFaceImage(source);
        setAllFaceImages([...allFaceImages, source]);
      }
    });
  };

  const launchCameraForRight = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1,
      base64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setRightFaceImage(source);
        setAllFaceImages([...allFaceImages, source]);
      }
    });
  };

  // console.log('frontCamera:', frontFaceImage);
  // console.log('leftCamera:', leftFaceImage);
  // console.log('rightCamera:', rightFaceImage);
  // console.log('patentRegNo:', patientRegNo);
  // console.log('patientName:', patientName);
  // console.log('patientAge:', patientAge);
  // console.log('patientSex:', patientSex);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('patientregno', patientRegNo);
      formData.append('patientname', patientName);
      formData.append('patientage', patientAge);
      formData.append('patientsex', patientSex);

      formData.append('image_front', {
        uri: frontFaceImage.uri,
        type: 'image/jpeg',
        name: 'image_front',
      });

      formData.append('image_left', {
        uri: leftFaceImage.uri,
        type: 'image/jpeg',
        name: 'image_left',
      });

      formData.append('image_right', {
        uri: rightFaceImage.uri,
        type: 'image/jpeg',
        name: 'image_right',
      });

      console.log('formData', formData);

      const response = await axios.post(
        'https://assist.pharynxai.in:6211/upload_images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Data sent successfully:');
      const isResponse = JSON.parse(response.data.data);
      setApiHit(true);
      setResponseData(isResponse);
      await AsyncStorage.setItem('response', JSON.stringify(isResponse));
    } catch (error) {
      if (error.response) {
        console.log('Server responded with status:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles1.container}>
      {apiHit === false ? (
        <>
          <ScrollView contentContainerStyle={styles1.container}>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Patient Registration Number:</Text>
              <TextInput
                style={styles1.input}
                value={patientRegNo}
                onChangeText={setPatientRegNo}
                placeholder="Enter registration number"
              />
            </View>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Patient Name:</Text>
              <TextInput
                style={styles1.input}
                value={patientName}
                onChangeText={setPatientName}
                placeholder="Enter patient name"
              />
            </View>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Patient Age:</Text>
              <TextInput
                style={styles1.input}
                value={patientAge}
                onChangeText={setPatientAge}
                placeholder="Enter patient age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Patient Sex:</Text>
              <View style={styles1.buttonContainer}>
                <TouchableOpacity onPress={() => setPatientSex('Male')}>
                  <Text
                    style={[
                      styles1.sexButton,
                      patientSex === 'Male' && styles1.selected,
                    ]}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPatientSex('Female')}>
                  <Text
                    style={[
                      styles1.sexButton,
                      patientSex === 'Female' && styles1.selected,
                    ]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles1.cameraContainer}>
              <Text style={styles1.cameraLabel}>Capture Front Face:</Text>
              {frontFaceImage && (
                <Image source={frontFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Front"
                onPress={launchCameraForFront}
              />
            </View>
            <View style={styles1.cameraContainer}>
              <Text style={styles1.cameraLabel}>Capture Left Face:</Text>
              {leftFaceImage && (
                <Image source={leftFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Left"
                onPress={launchCameraForLeft}
              />
            </View>
            <View style={styles1.cameraContainer}>
              <Text style={styles1.cameraLabel}>Capture Right Face:</Text>
              {rightFaceImage && (
                <Image source={rightFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Right"
                onPress={launchCameraForRight}
              />
            </View>
            <TouchableOpacity
              style={styles1.submitButton}
              onPress={handleSubmit}>
              <Text style={styles1.submitText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>
                Acne Severity Analysis Result as per PharynxCare
              </Text>
              <Text>Global Score:</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.imageContainer}>
                <Image
                
                  style={styles.image}
                  source={{
                    uri: 'https://assist.pharynxai.in:6211/static/images/result_0.jpg',
                  }}
                />
                <View style={styles.textContainer} />
              </View>

              <ScrollView horizontal style={styles.tableContainer}>
                <View>
                  {/* {
                      responseData.map((items,index)=>{
                        return (<Text style={styles.tableTitle} key={index}>{items}</Text>);
                      })
                    } */}

                  <Text style={styles.tableTitle}>Acne Severity</Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Download Full Report</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Recommended Products</Text>
              </View>
            </View>
          </View>

          <View>
            <ResultScreen data={responseData} />
          </View>
        </ScrollView>
      </View>
      )}
    </ScrollView>
  );
};

const styles1 = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sexButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerLabel: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraLabel: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    transform: [{scaleX: 1}],
  },
  textContainer: {
    flex: 1,
  },
  tableContainer: {
    maxHeight: 200,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Form;
