import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Image
} from 'react-native';

import logoSenai from '../assets/logosenai.png';

const API_URL = "http://10.154.20.24:5000";

export default function Editar({ onNavegar }) {
  const [idItem, setIdItem] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvarEdicao = async () => {
    if (
      !idItem.trim() ||
      !nome.trim() ||
      !descricao.trim() ||
      !quantidade.trim() ||
      !preco.trim() ||
      !categoria.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (salvando) return;

    setSalvando(true);

    try {
      const response = await fetch(
        `${API_URL}/estoque/${idItem.trim()}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome.trim(),
            qtde: Number(quantidade),
            descricao: descricao.trim(),
            preco: Number(preco.replace(',', '.')),
            categoria: categoria.trim(),
          }),
        }
      );

      const resultado = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Item atualizado no banco de dados!');

        setIdItem('');
        setNome('');
        setDescricao('');
        setQuantidade('');
        setPreco('');
        setCategoria('');
      } else {
        Alert.alert(
          'Erro',
          resultado.erro || 'Não foi possível atualizar o item.'
        );
      }

    } catch (error) {
      console.log('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível conectar à API.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#075BB5"
      />

      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Image
            source={logoSenai}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.btnSair}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Voltando para Estoque');

              if (typeof onNavegar === 'function') {
                onNavegar();
              }
            }}
          >
            <Text style={styles.btnSairText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>
          Editar Item do Estoque
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          <Text style={styles.label}>ID do Item a Editar</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={idItem}
            onChangeText={setIdItem}
          />

          <Text style={styles.label}>Nome do Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Parafuso"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o item..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />

          <View style={styles.rowInputs}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Quantidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 100"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
              />
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Preço (R$)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 0.50"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={preco}
                onChangeText={setPreco}
              />
            </View>
          </View>

          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ferramenta"
            placeholderTextColor="#999"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TouchableOpacity
            style={[
              styles.btnSalvar,
              salvando && styles.btnDesabilitado
            ]}
            activeOpacity={0.7}
            onPress={handleSalvarEdicao}
            disabled={salvando}
          >
            <Text style={styles.btnSalvarText}>
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075BB5',
  },

  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#075BB5',
  },

  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  logoImage: {
    width: 130,
    height: 40,
  },

  btnSair: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  btnSairText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 4,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333333',
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  halfInputContainer: {
    width: '48%',
  },

  btnSalvar: {
    backgroundColor: '#F45B2A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
    elevation: 2,
  },

  btnDesabilitado: {
    opacity: 0.6,
  },

  btnSalvarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
