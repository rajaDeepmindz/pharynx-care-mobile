/* eslint-disable prettier/prettier */
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {PieChart} from 'react-native-gifted-charts';
import {ReactNode, useEffect, useState} from 'react';

interface WrinklePred {
  g_pore: string;
  f_pore: string;
  a_pore: string;
  g_pigmentation: string;
  f_pigmentation: string;
  a_pigmentation: string;
  g_wrinkle_forehead: string;
  a_wrinkle_forehead: string;
  f_wrinkle_forehead: string;
  g_wrinkle_eye: string;
  a_wrinkle_eye: string;
  g_wrinkle_smileline: string;
}

interface Data {
  Name: ReactNode;
  patientAge: ReactNode;
  gender: ReactNode;
  skin_tone: ReactNode;
  dark_circle_severity: ReactNode;
  global_score: any;
  fn: ReactNode;
  fpu: ReactNode;
  fpa: ReactNode;
  fc: ReactNode;
  lsff: any;
  ln: ReactNode;
  lpu: ReactNode;
  lpa: ReactNode;
  lc: ReactNode;
  lslc: any;
  rn: ReactNode;
  rpu: ReactNode;
  rpa: ReactNode;
  rc: ReactNode;
  lsrc: any;
  wrinkle_pred: WrinklePred;
}

interface Props {
  data: Data;
}
// import {PieChart} from 'react-native-gifted-charts';
const ResultTest: React.FC<Props> = ({data}) => {
  const [wrinklePred, setWrinklePred] = useState<WrinklePred | null>(null);
  console.log('data--', data);
  console.log('data--', data.Name);
  useEffect(() => {
    if (data) {
      setWrinklePred(data.wrinkle_pred);
    }
  }, [data]);

  const parseAndFixValue = (value: string | undefined) => {
    return value ? parseFloat(parseFloat(value).toFixed(2)) : 0;
  };

  const pieData = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'lightgray'}
];

  const data1 = [
    {
      name: 'LeftFace',
      value: parseAndFixValue(wrinklePred?.g_pore),
      fill: '#25EEBD',
    },
    {
      name: 'RightFace',
      value: parseAndFixValue(wrinklePred?.f_pore),
      fill: '#FAEB60',
    },
    {
      name: 'FrontFace',
      value: parseAndFixValue(wrinklePred?.a_pore),
      fill: '#DD6FF8',
    },
  ];

  console.log('data1----', data1);
  //   const data2 = [
  //     {
  //       name: 'LeftFace',
  //       value: parseAndFixValue(wrinklePred?.g_pigmentation),
  //       fill: '#609AFA',
  //     },
  //     {
  //       name: 'RightFace',
  //       value: parseAndFixValue(wrinklePred?.f_pigmentation),
  //       fill: '#3B82F6',
  //     },
  //     {
  //       name: 'FrontFace',
  //       value: parseAndFixValue(wrinklePred?.a_pigmentation),
  //       fill: '#2570EB',
  //     },
  //   ];
  //   console.log('data2----', data2);
  //   const data3 = [
  //     {
  //       name: 'Left Forehead',
  //       value: parseAndFixValue(wrinklePred?.g_wrinkle_forehead),
  //       fill: '#DBE8FE',
  //     },
  //     {
  //       name: 'Right Forehead',
  //       value: parseAndFixValue(wrinklePred?.a_wrinkle_forehead),
  //       fill: '#BFD7FE',
  //     },
  //     {
  //       name: 'Front Forehead',
  //       value: parseAndFixValue(wrinklePred?.f_wrinkle_forehead),
  //       fill: '#93BBFD',
  //     },
  //     {
  //       name: 'Left Eye',
  //       value: parseAndFixValue(wrinklePred?.g_wrinkle_eye),
  //       fill: '#609AFA',
  //     },
  //     {
  //       name: 'Right Eye',
  //       value: parseAndFixValue(wrinklePred?.a_wrinkle_eye),
  //       fill: '#3B82F6',
  //     },
  //     {
  //       name: 'Smile',
  //       value: parseAndFixValue(wrinklePred?.g_wrinkle_smileline),
  //       fill: '#2570EB',
  //     },
  //   ];
  //   console.log('data3----', data3);

  return (
    <View>
      <View style={tw` p-2 flex-row   h-[200px]`}>
        <View>
          <Image
            style={tw`w-[130px] h-[150px] rounded-lg`}
            source={{
              uri: 'https://assist.pharynxai.in:6211/static/images/result_0.jpg',
            }}
          />
        </View>
        <View style={tw`p-2 text-black`}>
          <Text style={tw`font-bold`}>
            Name: <Text style={tw`text-blue-500`}>Raja kumar</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Age: <Text style={tw`text-blue-500`}>Raja kumar</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Sex: <Text style={tw`text-blue-500`}>Male</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Skin Tone:<Text style={tw`text-blue-500`}>Fair</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>Dark Circle Severity:</Text>
          <Text style={tw`font-bold text-blue-500 `}>[ None ]</Text>
        </View>
      </View>

      <View style={tw` p-3 mt-2 flex-row w[full] h-[160px]  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View >
            <PieChart
              data={data1}
              radius={60}
              textColor="black"
              textSize={12}
              innerRadius={40}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 ml-3`}>
            <Text style={tw`font-bold `}>
            Left Face: <Text style={tw`text-blue-500`}>{data?.wrinkle_pred.g_pigmentation.toFixed(2)}%</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
            Right Face: <Text style={tw`text-blue-500`}>{data?.wrinkle_pred.f_pigmentation.toFixed(2)}%</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
            Front Face:  <Text style={tw`text-blue-500`}>{data?.wrinkle_pred.a_pigmentation.toFixed(2)}%</Text>{' '}
            </Text>
          
          </View>
        </View>
      </View>
      <View style={tw` p-3 mt-2 flex-row w[full] h-[160px]  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View >
          <PieChart
                donut
                innerRadius={40}
                radius={60}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 30}}>70%</Text>;
                }}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 ml-3`}>
            <Text style={tw`font-bold `}>
              Name: <Text style={tw`text-blue-500`}>Raja kumar</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              Age: <Text style={tw`text-blue-500`}>24</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              Sex: <Text style={tw`text-blue-500`}>Male</Text>{' '}
            </Text>
          
          </View>
        </View>
      </View>
      <View style={tw` p-3 mt-2 flex-row w[full] h-[160px] bg-gray-500  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View >
          <PieChart
              strokeColor="white"
              strokeWidth={5}
              donut
              radius={65}
              data={[
                {value: 30, color: 'rgb(84,219,234)'},
                {value: 40, color: 'lightgreen'},
                {value: 20, color: 'orange'},
              ]}
              innerCircleColor="blue"
              innerCircleBorderWidth={5}
              innerCircleBorderColor={'white'}
              showValuesAsLabels={true}
              showText
              textSize={12}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{color: 'white', fontSize: 16}}>90</Text>
                    {/* <Text style={{color: 'white', fontSize: 18}}>Total</Text> */}
                  </View>
                );
              }}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 ml-3`}>
            <Text style={tw`font-bold `}>
              Name: <Text style={tw`text-blue-500`}>Raja kumar</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              Age: <Text style={tw`text-blue-500`}>24</Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              Sex: <Text style={tw`text-blue-500`}>Male</Text>{' '}
            </Text>
          
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResultTest;
