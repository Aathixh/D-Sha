import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StaffDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(
          "http://your-backend-url/staff/getSchedule",
          config
        );
        const sortedSchedule = response.data.sort(
          (a, b) => new Date(a.start_time) - new Date(b.start_time)
        );
        setSchedule(sortedSchedule);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderScheduleItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Bus Number: {item.bus_number}</Text>
      <Text style={styles.itemText}>Start Time: {item.start_time}</Text>
      <Text style={styles.itemText}>End Time: {item.end_time}</Text>
      <Text style={styles.itemText}>Route Details:</Text>
      {item.route.map((stop, index) => (
        <View key={index} style={styles.routeItem}>
          <Text style={styles.itemText}>Stop Name: {stop.stop_name}</Text>
          <Text style={styles.itemText}>Stop Order: {stop.stop_order}</Text>
        </View>
      ))}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.route[0].latitude,
          longitude: item.route[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {item.route.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.stop_name}
            description={`Stop Order: ${stop.stop_order}`}
          />
        ))}
        <Polyline
          coordinates={item.route.map((stop) => ({
            latitude: stop.latitude,
            longitude: stop.longitude,
          }))}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Feather
  //         style={styles.feather}
  //         name={"frown"}
  //         size={50}
  //         color={"black"}
  //       />
  //       <Text style={styles.errorText}>{error}</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Dashboard</Text>
      <FlatList
        data={schedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Show QR Code" onPress={() => setIsModalVisible(true)} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Scan to Pay</Text>
          <Image
            source={require("D:/D-Sha/mobile/my-app/assets/qrcode.webp")}
            style={styles.qrCodeImage}
          />
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  map: {
    height: 400,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
  errorContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  feather: {
    alignSelf: "center",
  },
  qrCodeImage: {
    alignSelf: "center",
  },
  modalTitle: {
    alignSelf: "center",
    fontSize: 18,
  },
  modalContent: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default StaffDashboard;
