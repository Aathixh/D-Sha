// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   Alert,
// } from "react-native";
// import Modal from "react-native-modal";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import axios from "axios";
// import { Feather } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const StaffDashboard = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [routeDetails, setRouteDetails] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };
//       try {
//         const response = await axios.get(
//           "http://your-backend-url/staff/getSchedule",
//           config
//         );
//         const sortedSchedule = response.data.sort(
//           (a, b) => new Date(a.start_time) - new Date(b.start_time)
//         );
//         setSchedule(sortedSchedule);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch data. Please try again later.");
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     // const fetchRouteData = async () => {
//     //   try {
//     //     const response = await axios.get(
//     //       "http://your-backend-url/admin/getRoute"
//     //     );
//     //     setRouteData(response.data);
//     //     setLoading(false);
//     //   } catch (error) {
//     //     setError("Failed to fetch route data. Please try again later.");
//     //     setLoading(false);
//     //   }
//     // };
//     // fetchRouteData();

//     const hardcodedRouteData = {
//       from: { latitude: 28.7041, longitude: 77.1025 }, // Coordinates for Delhi
//       to: { latitude: 28.4595, longitude: 77.0266 }, // Coordinates for Gurgaon
//       coordinates: [
//         { latitude: 28.7041, longitude: 77.1025 }, // Delhi
//         { latitude: 28.5355, longitude: 77.391 }, // Noida
//         { latitude: 28.4595, longitude: 77.0266 }, // Gurgaon
//       ],
//     };

//     setRouteData(hardcodedRouteData);
//     setLoading(false);
//   }, []);

//   const renderMap = () => {
//     if (loading) {
//       return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//       return (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       );
//     }

//     const { from, to, coordinates } = routeData;
//     return (
//       <MapView style={styles.map}>
//         <Marker coordinate={from} title="From" />
//         <Marker coordinate={to} title="To" />
//         <Polyline
//           coordinates={coordinates}
//           strokeWidth={4}
//           strokeColor="blue"
//         />
//       </MapView>
//     );

//     return null;
//   };

//   const handleAlertPress = () => {
//     Alert.alert(
//       "Send Alert",
//       "Are you sure you want to send an alert to the administrator?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "OK",
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem("authToken");
//               const config = {
//                 headers: { Authorization: `Bearer ${token}` },
//               };
//               await axios.post(
//                 "http://your-backend-url/staff/sendAlert",
//                 { message: "Staff sent an alert." },
//                 config
//               );
//               Alert.alert(
//                 "Alert Sent",
//                 "Your alert has been sent to the administrator."
//               );
//             } catch (error) {
//               Alert.alert(
//                 "Error",
//                 "Failed to send alert. Please try again later."
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   // if (loading) {
//   //   return (
//   //     <View style={styles.loadingContainer}>
//   //       <ActivityIndicator size="large" color="#0000ff" />
//   //     </View>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <View style={styles.errorContainer}>
//   //       <Feather
//   //         style={styles.feather}
//   //         name={"frown"}
//   //         size={50}
//   //         color={"black"}
//   //       />
//   //       <Text style={styles.errorText}>{error}</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Staff Dashboard</Text>
//       <Text style={styles.title}>Route Details</Text>
//       {renderMap()}
//       <Button title="Show QR Code" onPress={() => setIsModalVisible(true)} />
//       <Button title="Send Alert" onPress={handleAlertPress} color="red" />
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Scan to Pay</Text>
//           <Image
//             source={require("D:/D-Sha/mobile/my-app/assets/qrcode.webp")}
//             style={styles.qrCodeImage}
//           />
//           <Button title="Close" onPress={() => setIsModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//   },
//   map: {
//     height: 400,
//     width: "100%",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   itemText: {
//     fontSize: 18,
//   },
//   errorContainer: {
//     justifyContent: "center",
//     alignSelf: "center",
//     flex: 1,
//   },
//   errorText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   feather: {
//     alignSelf: "center",
//   },
//   qrCodeImage: {
//     alignSelf: "center",
//   },
//   modalTitle: {
//     alignSelf: "center",
//     fontSize: 18,
//   },
//   modalContent: {
//     flex: 1,
//     alignSelf: "center",
//     justifyContent: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   routeItem: {
//     marginBottom: 8,
//   },
// });

// export default StaffDashboard;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StaffDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routeDetails, setRouteDetails] = useState(null); // Corrected state variable name

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      setSchedule(sortedSchedule);
      setLoading(false);

      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const hardcodedRouteData = {
      from: { latitude: 28.7041, longitude: 77.1025 }, // Coordinates for Delhi
      to: { latitude: 28.4595, longitude: 77.0266 }, // Coordinates for Gurgaon
      coordinates: [
        { latitude: 28.7041, longitude: 77.1025 }, // Delhi
        { latitude: 28.4595, longitude: 77.0266 }, // Gurgaon
      ],
    };

    setRouteDetails(hardcodedRouteData); // Corrected state setter
    setLoading(false);
  }, []);

  const renderMap = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    const { from, to, coordinates } = routeDetails;
    return (
      <MapView style={styles.map}>
        <Marker coordinate={from} title="From" />
        <Marker coordinate={to} title="To" />
        <Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>
    );
  };

  const handleAlertPress = () => {
    Alert.alert(
      "Send Alert",
      "Are you sure you want to send an alert to the administrator?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("authToken");
              const config = {
                headers: { Authorization: `Bearer ${token}` },
              };
              await axios.post(
                "http://your-backend-url/staff/sendAlert",
                { message: "Staff sent an alert." },
                config
              );
              Alert.alert(
                "Alert Sent",
                "Your alert has been sent to the administrator."
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to send alert. Please try again later."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Details:</Text>
      {renderMap()}
      <Text></Text>
      <Button
        style={styles.btn}
        title="Show QR Code"
        onPress={() => setIsModalVisible(true)}
      />
      <Text></Text>
      <Button
        style={styles.btn}
        title="Send Alert"
        onPress={handleAlertPress}
        color="red"
      />
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
    justifyContent: "center",
    padding: 5,
  },
  map: {
    height: 400,
    width: "100%",
  },
  btn: { margin: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  qrCodeImage: {
    alignSelf: "center",
    padding: 10,
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
