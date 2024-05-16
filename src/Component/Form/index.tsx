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
// import ResultScreen from '../../Screens/Result';
// import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import ResultTest from '../../Screens/Resulttest';

const svgString = `
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="23.026" y="166.809" style="fill:#2E2E30;" width="481.359" height="299.403"></rect> <path style="fill:#D8D8DA;" d="M504.387,166.812H23.026v88.832h140.538c20.564-33.762,57.72-56.307,100.143-56.307 s79.579,22.545,100.143,56.307h140.537V166.812z"></path> <g> <rect x="23.026" y="166.809" style="fill:#ACABB1;" width="31.202" height="88.836"></rect> <rect x="473.187" y="166.809" style="fill:#ACABB1;" width="31.202" height="88.836"></rect> </g> <g> <rect x="23.026" y="255.645" style="fill:#1D1D1F;" width="31.202" height="210.577"></rect> <rect x="473.187" y="255.645" style="fill:#1D1D1F;" width="31.202" height="210.577"></rect> </g> <rect x="54.227" y="138.311" style="fill:#97C7EF;" width="70.46" height="28.392"></rect> <path style="fill:#C6C5CB;" d="M363.849,255.644c-20.564-33.762-57.72-56.307-100.143-56.307s-79.579,22.545-100.143,56.307 c-10.806,17.74-17.031,38.576-17.031,60.866c0,64.713,52.46,117.173,117.173,117.173s117.175-52.46,117.175-117.173 C380.88,294.219,374.654,273.384,363.849,255.644z"></path> <polygon style="fill:#77767E;" points="309.385,109.813 218.028,109.813 184.338,166.812 343.075,166.812 "></polygon> <polygon style="fill:#57565C;" points="330.361,143.822 197.053,143.822 184.338,166.812 343.075,166.812 "></polygon> <path style="fill:#E1E3FA;" d="M348.507,264.968c-17.414-28.59-48.878-47.681-84.801-47.681s-67.387,19.091-84.801,47.681 c-9.15,15.022-14.422,32.666-14.422,51.542c0,54.799,44.424,99.223,99.223,99.223s99.223-44.424,99.223-99.223 C362.929,297.635,357.658,279.99,348.507,264.968z"></path> <rect x="410.992" y="194.191" style="fill:#FEF5CC;" width="58.276" height="34.08"></rect> <path style="fill:#C60024;" d="M334.629,302.338c0-20.928-16.471-37.893-37.399-37.893c-14.573,0-27.223,8.229-33.563,20.291 c-6.339-12.063-18.99-20.291-33.563-20.291c-20.928,0-37.319,16.965-37.319,37.893c0,9.906,2.874,15.498,5.2,20.21 c9.601,19.451,65.682,65.922,65.682,65.922s56.529-46.605,65.682-65.922C331.585,317.829,334.629,311.809,334.629,302.338z"></path> <path d="M476.885,186.818h-73.505v48.819h73.505V186.818z M461.656,220.408h-43.047v-18.361h43.047V220.408z"></path> <rect x="54.227" y="192.424" width="70.46" height="15.229"></rect> <path d="M347.419,159.197l-33.69-56.999H213.683l-33.69,56.999h-47.692v-28.5H46.614v28.5H15.412v104.061v210.574h496.589V263.259 V159.197H347.419z M222.372,117.426h82.668l24.688,41.77H197.684L222.372,117.426z M61.843,145.927h55.229v13.163H61.843V145.927z M496.772,458.602H30.641V263.259h120.193c-7.821,16.57-11.914,34.745-11.914,53.252c0,68.809,55.98,124.789,124.789,124.789 c68.808,0,124.788-55.98,124.788-124.789c0-18.507-4.094-36.682-11.914-53.252h120.191V458.602z M154.147,316.511 c0-20.13,5.505-39.807,15.919-56.906c16.316-26.788,42.485-44.805,72.403-50.619c6.904-1.342,14.008-2.034,21.236-2.034 s14.333,0.692,21.236,2.034c29.918,5.814,56.087,23.831,72.403,50.619c10.415,17.098,15.919,36.776,15.919,56.906 c0,60.411-49.148,109.56-109.559,109.56C203.295,426.069,154.147,376.921,154.147,316.511z M496.772,248.03H368.038 c-0.492-0.749-1.002-1.486-1.511-2.223c-0.175-0.254-0.343-0.513-0.52-0.764c-0.726-1.037-1.468-2.062-2.224-3.076 c-0.216-0.289-0.442-0.572-0.66-0.859c-0.548-0.721-1.098-1.442-1.66-2.15c-0.308-0.387-0.625-0.766-0.938-1.149 c-0.488-0.6-0.976-1.2-1.474-1.79c-0.346-0.41-0.702-0.811-1.054-1.217c-0.478-0.551-0.956-1.104-1.445-1.647 c-0.373-0.415-0.753-0.823-1.132-1.234c-0.481-0.521-0.962-1.042-1.452-1.554c-0.394-0.412-0.793-0.818-1.192-1.224 c-0.489-0.499-0.98-0.995-1.476-1.484c-0.409-0.403-0.823-0.802-1.238-1.2c-0.502-0.481-1.006-0.958-1.515-1.432 c-0.421-0.391-0.846-0.779-1.272-1.163c-0.517-0.467-1.039-0.929-1.563-1.387c-0.43-0.377-0.863-0.75-1.3-1.121 c-0.534-0.454-1.074-0.902-1.616-1.346c-0.439-0.36-0.878-0.721-1.322-1.075c-0.553-0.442-1.113-0.875-1.673-1.308 c-0.444-0.342-0.886-0.686-1.335-1.022c-0.581-0.436-1.169-0.861-1.757-1.286c-0.439-0.317-0.874-0.638-1.318-0.949 c-0.624-0.44-1.258-0.867-1.891-1.295c-0.417-0.282-0.83-0.57-1.251-0.847c-0.71-0.468-1.429-0.921-2.149-1.375 c-0.354-0.223-0.704-0.454-1.061-0.673c-1.081-0.666-2.172-1.317-3.273-1.95c-18.801-10.797-40.26-16.504-62.06-16.504 s-43.261,5.707-62.06,16.504c-1.103,0.634-2.193,1.284-3.274,1.95c-0.355,0.218-0.703,0.448-1.056,0.67 c-0.721,0.454-1.442,0.908-2.152,1.377c-0.42,0.277-0.835,0.564-1.252,0.847c-0.634,0.428-1.267,0.856-1.892,1.295 c-0.442,0.311-0.876,0.63-1.314,0.946c-0.59,0.426-1.179,0.853-1.76,1.288c-0.448,0.335-0.888,0.678-1.331,1.019 c-0.562,0.434-1.123,0.868-1.678,1.311c-0.443,0.353-0.88,0.713-1.318,1.072c-0.543,0.446-1.083,0.893-1.618,1.348 c-0.437,0.371-0.869,0.745-1.3,1.121c-0.524,0.458-1.045,0.919-1.561,1.386c-0.427,0.386-0.852,0.774-1.274,1.166 c-0.51,0.473-1.014,0.95-1.516,1.432c-0.414,0.397-0.827,0.795-1.236,1.198c-0.498,0.491-0.99,0.989-1.479,1.487 c-0.398,0.406-0.797,0.811-1.19,1.223c-0.489,0.513-0.971,1.033-1.451,1.553c-0.379,0.41-0.76,0.819-1.133,1.235 c-0.487,0.542-0.965,1.093-1.443,1.644c-0.352,0.406-0.71,0.809-1.057,1.22c-0.497,0.589-0.983,1.187-1.47,1.785 c-0.314,0.385-0.633,0.765-0.941,1.153c-0.563,0.709-1.113,1.43-1.66,2.15c-0.218,0.287-0.444,0.57-0.66,0.859 c-0.756,1.014-1.499,2.039-2.224,3.076c-0.177,0.253-0.344,0.511-0.52,0.764c-0.509,0.738-1.017,1.475-1.511,2.223H30.641v-73.603 h140.352H356.42h140.352V248.03z"></path> <path d="M191.157,325.918c10.031,20.321,61.783,63.553,67.651,68.415l4.846,4.016l4.856-4.003 c5.92-4.881,58.116-48.27,67.718-68.537l0.259-0.546c2.291-4.82,5.755-12.103,5.755-22.925c0-25.093-20.193-45.507-45.013-45.507 c-12.975,0-25.063,5.463-33.563,14.759c-8.5-9.295-20.588-14.759-33.563-14.759c-12.151,0-23.497,4.755-31.948,13.386 c-8.374,8.553-12.985,19.96-12.985,32.122c0,11.464,3.371,18.287,5.833,23.268L191.157,325.918z M230.104,272.06 c11.287,0,21.565,6.215,26.822,16.219l6.74,12.826l6.74-12.826c5.257-10.004,15.535-16.219,26.822-16.219 c16.701,0,29.784,13.3,29.784,30.278c0,7.385-2.273,12.167-4.279,16.385l-0.268,0.563c-6.272,13.238-40.959,44.186-58.788,59.25 c-17.728-15.05-52.257-45.97-58.865-59.36l-0.157-0.318c-2.092-4.235-4.256-8.615-4.256-16.521 C200.399,285.36,213.447,272.06,230.104,272.06z"></path> <polygon points="483.796,415.159 468.567,415.159 468.567,431.099 405.953,431.099 405.953,446.328 483.796,446.328 "></polygon> <rect x="468.568" y="381.518" width="15.229" height="24.347"></rect> <rect x="81.842" y="38.17" width="15.229" height="53.83"></rect> <rect x="153.085" y="55.006" transform="matrix(-0.9076 -0.4198 0.4198 -0.9076 272.1609 223.7355)" width="15.229" height="53.829"></rect> <rect x="-8.705" y="74.307" transform="matrix(-0.4198 -0.9076 0.9076 -0.4198 -48.4983 132.8394)" width="53.829" height="15.229"></rect> </g></svg>

`;
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
              <Text style={styles1.label}>Patient Name</Text>
              <TextInput
                style={styles1.input}
                value={patientName}
                onChangeText={setPatientName}
                placeholder="Enter patient name"
              />
            </View>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Patient Age</Text>
              <TextInput
                style={styles1.input}
                value={patientAge}
                onChangeText={setPatientAge}
                placeholder="Enter patient age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles1.inputContainer}>
              <Text style={styles1.label}>Gender</Text>
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
                <TouchableOpacity onPress={() => setPatientSex('outher')}>
                  <Text
                    style={[
                      styles1.sexButton,
                      patientSex === 'outher' && styles1.selected,
                    ]}>
                    Outher
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={tw`bg-gray-200 mb-5`} >
              {frontFaceImage && (
                <Image source={frontFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Front"
                onPress={launchCameraForFront}
              />
            </View> */}

            <View style={tw`w-full h-[125px]  rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                <View>
                  <Text>Front profile</Text>
                  <SvgXml xml={svgString} onPress={launchCameraForFront} style={tw`mt-1`} />
                </View>
                <View>
                  <Text style={tw`text-center justify-center items-center `}>Front Face</Text>
                  <View style={tw`w-[110px] h-[80px]  rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                  {frontFaceImage && (
                <Image source={frontFaceImage} style={styles1.imagePreview}  />
              )}
                  </View>
                </View>
            </View>
            <View style={tw`w-full h-[125px] mt-5 rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                <View>
                  <Text>Left profile</Text>
                  <SvgXml xml={svgString} onPress={launchCameraForLeft} style={tw`mt-1`} />
                </View>
                <View>
                  <Text style={tw`text-center justify-center items-center `}>Left Face</Text>
                  <View style={tw`w-[110px] h-[80px]  rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                  {leftFaceImage && (
                <Image source={leftFaceImage} style={styles1.imagePreview}  />
              )}
                  </View>
                </View>
            </View>
            {/* <View style={styles1.cameraContainer}>
              <Text style={styles1.cameraLabel}>Capture Left Face:</Text>
              {leftFaceImage && (
                <Image source={leftFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Left"
                onPress={launchCameraForLeft}
              />
            </View> */}

              <View style={tw`w-full mt-5 h-[125px]  rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                <View>
                  <Text>Right profile</Text>
                  <SvgXml xml={svgString} onPress={launchCameraForRight} style={tw`mt-1`} />
                </View>
                <View>
                  <Text style={tw`text-center justify-center items-center `}>Right Face</Text>
                  <View style={tw`w-[110px] h-[80px]  rounded-lg flex-row gap-10 p-3 border border-gray-400`}>
                  {rightFaceImage && (
                <Image source={rightFaceImage} style={styles1.imagePreview}  />
              )}
                  </View>
                </View>
            </View>
            {/* <View style={styles1.cameraContainer}>
              <Text style={styles1.cameraLabel}>Capture Right Face:</Text>
              {rightFaceImage && (
                <Image source={rightFaceImage} style={styles1.imagePreview} />
              )}
              <Button
                title="Launch Camera for Right"
                onPress={launchCameraForRight}
              />
            </View> */}
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
            {/* <ResultScreen data={responseData} /> */}
            <ResultTest data={responseData} />

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
    width: 95,
    height: 72,
    marginTop: -7,
    borderRadius: 5,
    marginLeft:-5,
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
