import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Registro = ({ navigation }) => {
  const handleRegister = async (values) => {
    try {
      const response = await fetch('http://192.168.0.217:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registro exitoso");
        navigation.navigate('Login');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
    telefono: Yup.string()
      .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
      .required('El teléfono es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación es obligatoria'),
  });

  return (
    <ImageBackground source={require('../assets/Patron_boca.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <Formik
          initialValues={{ nombre: '', correo: '', telefono: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                value={values.nombre}
              />
              {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={handleChange('correo')}
                onBlur={handleBlur('correo')}
                value={values.correo}
                keyboardType="email-address"
              />
              {touched.correo && errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                onChangeText={handleChange('telefono')}
                onBlur={handleBlur('telefono')}
                value={values.telefono}
                keyboardType="numeric"
                maxLength={10}
              />
              {touched.telefono && errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#050505',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fffccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#fadbd8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#050505',
    fontWeight: 'bold',
  },
  link: {
    color: '#050505',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Registro;