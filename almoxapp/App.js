
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Login from './Telas/Login';
import Estoque from './Telas/Estoque';
import Editar from './Telas/Editar';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('Login');

  return (
    <View style={styles.container}>

      {telaAtual === 'Login' ? (
        <Login
          onNavegar={() => setTelaAtual('Estoque')}
        />
      ) : telaAtual === 'Estoque' ? (
        <Estoque
          onNavegar={() => setTelaAtual('Login')}
          onIrParaEditar={() => setTelaAtual('Editar')}
        />
      ) : (
        <Editar
          onNavegar={() => setTelaAtual('Estoque')}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
