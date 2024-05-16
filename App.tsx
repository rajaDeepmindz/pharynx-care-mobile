import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';
import HomeScreen from './src/Screens/Home';
import CustomBottamNav from './src/Component/BottomTab';
import {View} from 'react-native';
import AboutScreen from './src/Screens/About';
import Settings from './src/Screens/Setting';
// import 'react-native-gesture-handler';

const App = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Provider store={store}>
      {/* <DrawerNavigator /> */}
      <View
        style={{backgroundColor: 'white', flex: 1, alignItems: 'center'}}  >
        <CustomBottamNav
          height={50}
          bg={'pink'}
          onSelected={(index: any) => setSelectedTab(index)}
          tabs={[
            {title: 'Home', icon: '/'},
            {title: 'Result'},
            {title: 'Products'},
          ]}
        />
        {selectedTab === 0 ? (
          <HomeScreen />
        ) : selectedTab === 1 ? (
          <AboutScreen />
        ) : (
          <Settings />
        )}
      </View>
    </Provider>
  );
};

export default App;
