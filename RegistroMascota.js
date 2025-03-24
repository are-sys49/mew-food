import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";

const PetRegisterScreen = () => {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [peso, setPeso] = useState("");
  const [foto, setFoto] = useState(null);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const guardarMascota = () => {
    Alert.alert("Guardado", "¡La mascota ha sido registrada!");
    // Aquí podrías hacer el POST a tu backend
  };

  const cancelar = () => {
    setNombre("");
    setRaza("");
    setColor("");
    setPeso("");
    setFoto(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa a tu mascota</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />

      <Text style={styles.label}>Raza</Text>
      <TextInput
        style={styles.input}
        value={raza}
        onChangeText={setRaza}
        placeholder="Raza"
      />

      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Color"
      />

      <Text style={styles.label}>Peso</Text>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Foto</Text>
      <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
        <Text style={styles.imageButtonText}>
          {foto ? "Imagen seleccionada" : "Seleccionar imagen"}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={guardarMascota}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={cancelar}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetRegisterScreen;

const styles = StyleSheet.create({
   
  container: {
    backgroundColor: "#AEEEEE",
    padding: 35,
    borderRadius: 20,
    margin: 30,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#B2FFFF",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#B2FFFF",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
