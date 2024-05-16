/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import React, {ReactNode, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

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

const ResultScreen: React.FC<Props> = ({data}) => {
  const [wrinklePred, setWrinklePred] = useState<WrinklePred | null>(null);
  console.log("data--", data)
  console.log("data--", data.Name)
  useEffect(() => {
    if (data) {
      setWrinklePred(data.wrinkle_pred);
    }
  }, [data]);

  const parseAndFixValue = (value: string | undefined) => {
    return value ? parseFloat(parseFloat(value).toFixed(2)) : 0;
  };

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
  if (!wrinklePred) {
    return <Text>Loading...</Text>;
  }

  // const getRandomColor = () => {
  //   // Implement your logic to generate random colors
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // };

  // Extract relevant values for the pie chart
  // const pieData = Object.keys(wrinklePred).map(key => ({
  //   title: key,
  //   value: wrinklePred[key],
  //   color: getRandomColor(), // You can implement your logic to get colors
  // })); 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.header}>Acne Severity Analysis Result</Text>
        <View style={styles.separator} />

        <View style={styles.analysisSection}>
            <Image
              style={styles.analysisImage}
              source={{ uri: 'https://assist.pharynxai.in:6211/static/images/result_0.jpg' }}
            />
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>Name</Text>
              <Text style={styles.tableCellRight}>{data?.Name}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>Age</Text>
              <Text style={styles.tableCellRight}>{data?.patientAge}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>Gender</Text>
              <Text style={styles.tableCellRight}>{data?.gender}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>Skin Tone</Text>
              <Text style={styles.tableCellRight}>{data?.skin_tone}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>Dark Circle Severity</Text>
              <Text style={styles.tableCellRight}>{data?.dark_circle_severity}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableAnalysisWrapper}>
          <View style={styles.tableWrapper}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Face Region</Text>
              <Text style={styles.tableHeader}>Acne Class</Text>
              <Text style={styles.tableHeader}>Local Score</Text>
            </View>

            {/* Front Face */}
            <View style={styles.tableRow}>
              <View style={styles.faceImageWrapper}>
                <Image
                  style={styles.faceImage}
                  source={{ uri: 'https://assist.pharynxai.in:6211/static/images/result_0.jpg' }}
                />
                <Text style={styles.faceLabel}>Front Face Acne</Text>
              </View>
              <View style={styles.innerTable}>
                <Text style={styles.innerTableCell}>{data?.fn}</Text>
                <Text style={styles.innerTableCell}>{data?.fpu}</Text>
                <Text style={styles.innerTableCell}>{data?.fpa}</Text>
                <Text style={styles.innerTableCell}>{data?.fc}</Text>
              </View>
            </View>

            {/* Left Face */}
            <View style={styles.tableRow}>
              <View style={styles.faceImageWrapper}>
                <Image
                  style={styles.faceImage}
                  source={{ uri: 'https://assist.pharynxai.in:6211/static/images/result_1.jpg' }}
                />
                <Text style={styles.faceLabel}>Left Face Acne</Text>
              </View>
              <View style={styles.innerTable}>
                <Text style={styles.innerTableCell}>{data?.ln}</Text>
                <Text style={styles.innerTableCell}>{data?.lpu}</Text>
                <Text style={styles.innerTableCell}>{data?.lpa}</Text>
                <Text style={styles.innerTableCell}>{data?.lc}</Text>
              </View>
            </View>

            {/* Right Face */}
            <View style={styles.tableRow}>
              <View style={styles.faceImageWrapper}>
                <Image
                  style={styles.faceImage}
                  source={{ uri: 'https://assist.pharynxai.in:6211/static/images/result_2.jpg' }}
                />
                <Text style={styles.faceLabel}>Right Face Acne</Text>
              </View>
              <View style={styles.innerTable}>
                <Text style={styles.innerTableCell}>{data?.rn}</Text>
                <Text style={styles.innerTableCell}>{data?.rpu}</Text>
                <Text style={styles.innerTableCell}>{data?.rpa}</Text>
                <Text style={styles.innerTableCell}>{data?.rc}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonsWrapper}>
          <Button title="Download Report" color="#00B5BD" />
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>AI Recommendations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pieChartWrapper}>
          <Text style={styles.chartTitle}>Wrinkle Analysis</Text>
          <PieChart
            data={data3}
            radius={80}
            textColor="black"
            textSize={12}
            innerRadius={50}
          />
          <View style={styles.chartTable}>
            <Text style={styles.chartTableRow}>Left Forehead: {data?.wrinkle_pred.g_wrinkle_forehead.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Right Forehead: {data?.wrinkle_pred.a_wrinkle_forehead.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Front Forehead: {data?.wrinkle_pred.f_wrinkle_forehead.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Left Eye: {data?.wrinkle_pred.g_wrinkle_eye.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Right Eye: {data?.wrinkle_pred.a_wrinkle_eye.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Smile Line: {data?.wrinkle_pred.g_wrinkle_smileline.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.pieChartWrapper}>
          <Text style={styles.chartTitle}>Pigmentation Analysis</Text>
          <PieChart
            data={data2}
            radius={80}
            textColor="black"
            textSize={12}
            innerRadius={50}
          />
          <View style={styles.chartTable}>
            <Text style={styles.chartTableRow}>Left Face: {data?.wrinkle_pred.g_pigmentation.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Right Face: {data?.wrinkle_pred.f_pigmentation.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Front Face: {data?.wrinkle_pred.a_pigmentation.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.pieChartWrapper}>
          <Text style={styles.chartTitle}>Pore Analysis</Text>
          <PieChart
            data={data1}
            radius={80}
            textColor="black"
            textSize={12}
            innerRadius={50}
          />
          <View style={styles.chartTable}>
            <Text style={styles.chartTableRow}>Left Face: {data?.wrinkle_pred.g_pore.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Right Face: {data?.wrinkle_pred.f_pore.toFixed(2)}%</Text>
            <Text style={styles.chartTableRow}>Front Face: {data?.wrinkle_pred.a_pore.toFixed(2)}%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainContent: {
    flexDirection: 'row',
    width: '98%',
    height: '91%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00B5BD',
  },
  analysisSection: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analysisImageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  analysisImage: {
    width: 200,
    height: 200,
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableCellLeft: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableCellRight: {
    flex: 1,
    textAlign: 'right',
  },
  progressWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  progressCircle: {
    height: 200,
    width: 200,
  },
  tableAnalysisWrapper: {
    marginTop: 20,
  },
  tableWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  faceImageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  faceImage: {
    width: 100,
    height: 100,
  },
  faceLabel: {
    textAlign: 'center',
    marginTop: 5,
  },
  innerTable: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  innerTableCell: {
    textAlign: 'center',
    flex: 1,
  },
  sideContent: {
    flex: 2,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  aiButton: {
    backgroundColor: '#00B5BD',
    borderRadius: 5,
    padding: 10,
  },
  aiButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  pieChartWrapper: {
    marginBottom: 20,
  },
  chartTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  pieChart: {
    height: 200,
  },
  chartTable: {
    marginTop: 10,
  },
  chartTableRow: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default ResultScreen;
