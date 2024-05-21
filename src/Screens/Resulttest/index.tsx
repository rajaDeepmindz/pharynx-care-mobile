/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {Image, Text, TouchableOpacity, View} from 'react-native';
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

  let x = data.global_score;
  let y = 100 - data.global_score;
  const pieData = [
    {value: x, color: '#177AD5'},
    {value: y, color: 'lightgray'},
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
  const data2 = [
    {
      name: 'LeftFace',
      value: parseAndFixValue(wrinklePred?.g_pigmentation),
      fill: '#609AFA',
    },
    {
      name: 'RightFace',
      value: parseAndFixValue(wrinklePred?.f_pigmentation),
      fill: '#3B82F6',
    },
    {
      name: 'FrontFace',
      value: parseAndFixValue(wrinklePred?.a_pigmentation),
      fill: '#2570EB',
    },
  ];
  console.log('data2----', data2);
  const data3 = [
    {
      name: 'Left Forehead',
      value: parseAndFixValue(wrinklePred?.g_wrinkle_forehead),
      fill: '#DBE8FE',
    },
    {
      name: 'Right Forehead',
      value: parseAndFixValue(wrinklePred?.a_wrinkle_forehead),
      fill: '#BFD7FE',
    },
    {
      name: 'Front Forehead',
      value: parseAndFixValue(wrinklePred?.f_wrinkle_forehead),
      fill: '#93BBFD',
    },
    {
      name: 'Left Eye',
      value: parseAndFixValue(wrinklePred?.g_wrinkle_eye),
      fill: '#609AFA',
    },
    {
      name: 'Right Eye',
      value: parseAndFixValue(wrinklePred?.a_wrinkle_eye),
      fill: '#3B82F6',
    },
    {
      name: 'Smile',
      value: parseAndFixValue(wrinklePred?.g_wrinkle_smileline),
      fill: '#2570EB',
    },
  ];
  console.log('data3----', data3);

  return (
    <View>
      <View>
        <Text>Acne Severity Analysis Result</Text>
      </View>
      <View style={tw` p-2 flex-row   h-[200px]`}>
        <View>
          <Image
            style={tw`w-[130px] h-[150px] rounded-lg`}
            source={{
              uri: 'https://assist.pharynxai.in:6211/static/images/upload_0.jpg',
            }}
          />
        </View>
        <View style={tw`p-2 text-black`}>
          <Text style={tw`font-bold`}>
            Name: <Text style={tw`text-blue-500`}>{data?.Name}</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Age: <Text style={tw`text-blue-500`}>{data?.patientAge}</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Sex: <Text style={tw`text-blue-500`}>{data?.gender}</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>
            Skin Tone:<Text style={tw`text-blue-500`}>{data?.skin_tone}</Text>{' '}
          </Text>
          <Text style={tw`font-bold mt-2`}>Dark Circle Severity:</Text>
          <Text style={tw`font-bold text-blue-500 `}>
            [ {data?.dark_circle_severity} ]
          </Text>
        </View>
      </View>

      <View
        style={tw`flex-row w[full] h-[140px] mb-2 justify-center items-center text-center`}>
        <PieChart
          donut
          innerRadius={60}
          radius={80}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text style={{fontSize: 30}} style={tw`text-5xl font-bold`}>
                {data.global_score}
              </Text>
            );
          }}
        />
      </View>
      <Text style={tw`text-center mt-3 font-bold text-xl`}>Global Score</Text>

      <View style={tw` p-3 mt-2 flex-row w[full] h-[160px]  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View>
            <Text style={tw`-mt-2 underline ml-1 mb-1`}>
              Pigmentation Analysis
            </Text>
            <PieChart
              strokeColor="white"
              strokeWidth={2}
              donut
              innerRadius={40}
              radius={55}
              data={[
                {
                  value: parseAndFixValue(wrinklePred?.g_pigmentation),
                  color: 'rgb(84,219,234)',
                },
                {
                  value: parseAndFixValue(wrinklePred?.f_pigmentation),
                  color: 'lightgreen',
                },
                {
                  value: parseAndFixValue(wrinklePred?.a_pigmentation),
                  color: 'orange',
                },
              ]}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 -ml-5`}>
            <Text style={tw`font-bold `}>
              <View style={tw`w-2 h-2 bg-sky-300 rounded-full `} /> Left
              Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.g_pigmentation.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-green-400 rounded-full `} /> Right
              Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.f_pigmentation.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-yellow-500 rounded-full `} />{' '}
              Front Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.a_pigmentation.toFixed(2)}%
              </Text>{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw` p-3 mt-2 flex-row w[full] h-[160px]  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View>
            <Text style={tw`-mt-2 underline ml-1 mb-1`}>Pore Analysis</Text>
            <PieChart
              strokeColor="white"
              strokeWidth={2}
              donut
              innerRadius={40}
              radius={55}
              data={[
                {
                  value: parseAndFixValue(wrinklePred?.g_pore),
                  color: 'rgb(84,219,234)',
                },
                {
                  value: parseAndFixValue(wrinklePred?.f_pore),
                  color: 'lightgreen',
                },
                {value: parseAndFixValue(wrinklePred?.a_pore), color: 'orange'},
              ]}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 ml-3`}>
            <Text style={tw`font-bold `}>
              <View style={tw`w-2 h-2 bg-sky-300 rounded-full `} /> Left
              Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.g_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-green-700 rounded-full `} /> Right
              Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.f_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-yellow-500 rounded-full `} />{' '}
              Front Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.a_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw` p-3 mt-2 flex-row w-[full] h-[160px]  rounded shadow`}>
        <View style={tw` p-2 flex-row   h-[200px]`}>
          <View>
            <Text style={tw`-mt-2 underline mb-1`}>Wrinkle Analysis</Text>
            <PieChart
              strokeColor="white"
              strokeWidth={2}
              donut
              innerRadius={40}
              radius={55}
              data={[
                {
                  value: parseAndFixValue(wrinklePred?.g_wrinkle_forehead),
                  color: '#DBE8FE',
                },
                {
                  value: parseAndFixValue(wrinklePred?.a_wrinkle_forehead),
                  color: '#BFD7FE',
                },
                {
                  value: parseAndFixValue(wrinklePred?.f_wrinkle_forehead),
                  color: '#93BBFD',
                },
                {
                  value: parseAndFixValue(wrinklePred?.g_wrinkle_eye),
                  color: '#609AFA',
                },
                {
                  value: parseAndFixValue(wrinklePred?.a_wrinkle_eye),
                  color: '#3B82F6',
                },
                {
                  value: parseAndFixValue(wrinklePred?.g_wrinkle_smileline),
                  color: '#2570EB',
                },
              ]}
            />
          </View>
          <View style={tw`p-2 text-black mt-5 ml-3`}>
            <Text style={tw`font-bold `}>
              <View style={tw`w-2 h-2 bg-sky-300 rounded-full `} /> Left
              Forehead:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.g_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-green-700 rounded-full
              `} /> Right
              Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.f_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
            <Text style={tw`font-bold mt-2`}>
              <View style={tw`w-2 h-2 bg-yellow-500 rounded-full `} />{' '}
              Front Face:{' '}
              <Text style={tw`text-blue-500`}>
                {data?.wrinkle_pred?.a_pore.toFixed(2)}%
              </Text>{' '}
            </Text>
          </View>
        </View>
      </View>

      <Text style={tw`mt-2 font-bold`}>Over all Scroer</Text>

      <View>
        <View>
          <View>
            <Image
              style={tw`w-[80px] h-[80px]  rounded-lg rounded-full mt-5`}
              source={{
                uri: 'https://assist.pharynxai.in:6211/static/images/upload_0.jpg',
              }}
            />
          </View>
          <View>
            <Text
              style={tw`text-center font-bold justify-center items-center -mt-15 -ml-10`}>
              Front Face Acne
            </Text>
          </View>
          </View>

          <View style={tw`flex-row  w-[300px] justify-between mt-2`}>
          <View>
            <Text style={tw`font-bold`}>Acne Class</Text>
            <Text style={tw`mt-3 `}>Levels 1       0</Text>
            <Text style={tw`mt-3 `}>Levels 2       0</Text>
            <Text style={tw`mt-3 `}>Levels 3       0</Text>
            <Text style={tw`mt-3 `}>Levels 4       0</Text>
          </View>
          <View style={tw`mt-2`}>
          <PieChart

          donut
          innerRadius={50}
          radius={60}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text style={{fontSize: 30}} style={tw`text-4xl  font-bold`}>
                {data.global_score}
              </Text>
            );
          }}
        />

          <Text style={tw`text-center font-bold mt-1 `}>Global Score</Text>
          </View>

          </View>
      </View>
    </View>
  );
};

export default ResultTest;
