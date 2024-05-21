/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const RecommendProducts = () => {
  const [products, setProducts] = useState([]);
  const [cleanser, setCleanser] = useState([]);
  const [eyeProducts, setEyeProducts] = useState([]);
  const [faceMoisture, setFaceMoisture] = useState([]);
  const [maskAndPeel, setMaskAndPeel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://assist.pharynxai.in:6211/recommend_products'
        );
        setProducts(response.data);
        setCleanser(response.data.cleanser);
        setEyeProducts(response.data.eye_product);
        setFaceMoisture(response.data.face_moisturisers);
        setMaskAndPeel(response.data.mask_and_peel);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Alert.alert('Error', 'Failed to fetch data. Please try again.');
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to run the effect only once on mount

  console.log(products);
  console.log('cleanser', cleanser);
  console.log('eye', eyeProducts);
  console.log('face', faceMoisture);
  console.log('mask', maskAndPeel);

  const fallbackImageUrl = 'https://via.placeholder.com/150';

  const renderProductCard = (product: {
    image: string; id: React.Key | null | undefined; image_url: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
}) => (
    <View key={product.id} style={styles.cardContainer}>
      <Image
        style={styles.productImage}
        source={{
          uri: product.image || fallbackImageUrl,
        }}
        onError={(e) => {
          console.error('Image failed to load', e.nativeEvent.error);
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended Products</Text>
      {cleanser.length > 0 && (
        <>
          <Text style={styles.categoryTitle}>Cleansers</Text>
          <View style={styles.productList}>
            {cleanser.map(renderProductCard)}
          </View>
        </>
      )}
      {eyeProducts.length > 0 && (
        <>
          <Text style={styles.categoryTitle}>Eye Products</Text>
          <View style={styles.productList}>
            {eyeProducts.map(renderProductCard)}
          </View>
        </>
      )}
      {faceMoisture.length > 0 && (
        <>
          <Text style={styles.categoryTitle}>Face Moisturisers</Text>
          <View style={styles.productList}>
            {faceMoisture.map(renderProductCard)}
          </View>
        </>
      )}
      {maskAndPeel.length > 0 && (
        <>
          <Text style={styles.categoryTitle}>Masks and Peels</Text>
          <View style={styles.productList}>
            {maskAndPeel.map(renderProductCard)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RecommendProducts;
