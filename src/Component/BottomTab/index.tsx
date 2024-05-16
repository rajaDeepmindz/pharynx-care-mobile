import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const CustomBottamNav = ({tabs, onSelected, height, bg}: any) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View
      style={{
        width: '100%',
        height: height ? height : 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: bg ? bg : 'white',
        flexDirection: 'row',
      }}>
      <FlatList
        horizontal
        data={tabs}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get('window').width / tabs.length,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setSelectedTab(index);
                onSelected(index);
              }}>
              {item.icon != null && (
                <Image
                  source={selectedTab == index ? item.activeIcon : item.icon}
                  style={{width: item.size, height: item.size}}
                />
              )}
              {item.title != null && (
                <Text
                  style={{
                    marginTop: 5,
                    color: selectedTab === index ? 'red' : 'black',
                  }}>
                  {item.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomBottamNav;
