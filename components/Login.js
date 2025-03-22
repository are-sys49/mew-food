import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator    } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

const saveSession = async (token) => {
    try {
        await AsyncStorage.setItem("userToken", token);
    } catch (error) {
        console.log(error);
    }
};

const Login = ({onLoginSuccess}) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/MEWFOOD.png")} 
            style={styles.logo}
            resizeMode="contain"
          />
    
          <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
    
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                setTimeout(async () => {
                  await saveSession("fakeToken123");
                  Alert.alert("Éxito", "Inicio de sesión exitoso");
                  onLoginSuccess();
                  setLoading(false);
                }, 1500);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text>Correo:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
    
                  <Text>Contraseña:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
    
                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      );
    };
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex",
        marginTop: 100,
      },
      logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
      },
    container: {
        backgroundColor: "#8DE0D6",
        padding: 30,
        borderRadius: 10,
        margin: 60,
        width: 350,
        height: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
      title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        padding: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: "#888",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        width: 300,
        overflow: "hidden",
        alignSelf: "center",
      },
      error: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
      },
      button: {
        backgroundColor: "#C6FFFA",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 20,
        margin: 25,
      },
      buttonDisabled: {
        backgroundColor: "#ccc",
      },
      buttonText: {
        color: "#000",
        fontWeight: "bold",
      },
    });

    export default Login;