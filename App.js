import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/Login";
import Registro from "./components/Registro";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Verificar si ya hay sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setIsLoggedIn(true);
      }
      setCheckingSession(false);
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (checkingSession) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Button title="Cerrar Sesión" onPress={handleLogout} />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default App;


