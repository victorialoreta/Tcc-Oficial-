import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    console.log('Email:', email);
    console.log('Senha:', senha);
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        {/* CABEÇALHO */}
        <View style={styles.header}>
<Image
  source={require('./assets/logo.senai.png')}
  style={styles.logoImage}
  resizeMode="contain"
/>


          <Text style={styles.welcome}>
            Bem-vindo!
          </Text>


        </View>


        {/* FORMULÁRIO */}
        <View style={styles.form}>

          {/* EMAIL */}
          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />


          {/* SENHA */}
          <Text style={styles.label}>
            Senha
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />



          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >

            <Text style={styles.loginButtonText}>
              ENTRAR
            </Text>

          </TouchableOpacity>


        
        </View>


        {/* RODAPÉ */}
        <View style={styles.footer}>

          <Text style={styles.footerText}>
            ALMOXAPP
          </Text>

        </View>

      </KeyboardAvoidingView>

      <StatusBar
        style="light"
        backgroundColor="#075BB5"
      />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  // CORES PRINCIPAIS

  safeArea: {
    flex: 1,
    backgroundColor: '#075BB5',
  },

  container: {
    flex: 1,
    backgroundColor: '#075BB5',
  },


  // CABEÇALHO

  header: {
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },

  logo: {
    width: 75,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#F45B2A',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 12,
  },

 logoImage: {
  width: 250,
  height: 100,
},

  appName: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 25,
  },

  welcome: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#E8F1FF',
    fontSize: 15,
    textAlign: 'center',
  },


  // FORMULÁRIO

  form: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,
    marginTop: 150,

    borderRadius: 20,

    paddingHorizontal: 25,
    paddingVertical: 28,

    elevation: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  label: {
    color: '#075BB5',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  input: {
    height: 52,

    borderWidth: 1.5,
    borderColor: '#D9E2EF',

    borderRadius: 10,

    paddingHorizontal: 15,

    fontSize: 16,

    color: '#222',

    backgroundColor: '#F8FAFC',

    marginBottom: 18,
  },






  // BOTÃO

  loginButton: {
    height: 53,

    backgroundColor: '#F45B2A',

    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },


  // CADASTRO

  registerContainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 25,
  },

  registerText: {
    color: '#777',
    fontSize: 14,
  },

  registerButton: {
    color: '#F45B2A',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },


  // RODAPÉ

  footer: {
    alignItems: 'center',
    marginTop: 25,
  },

  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    opacity: 0.7,
  },

});