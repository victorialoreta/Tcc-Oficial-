import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Login from "./Telas/Login";
import Estoque from "./Telas/Estoque";

export default function App() {
  // Estado que guarda o nome da tela atual
  const [telaAtual, setTelaAtual] = useState('Login');

  // Função para navegar entre as telas
  const navegarPara = (nomeDaTela) => {
    setTelaAtual(nomeDaTela);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Renderização condicional baseada no estado */}
      {telaAtual === 'Login' ? (
        <Login onNavegar={() => navegarPara('Estoque')} />
      ) : (
        <Estoque onNavegar={() => navegarPara('Login')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.StyleSheet ? StyleSheet.create({
  container: {
    flex: 1,
  },
}) : {
  container: {
    flex: 1,
  },
};
