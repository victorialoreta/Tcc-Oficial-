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

export default function Editar({ onNavegar }) {
  // Estados para os campos do formulário de edição
  const [idItem, setIdItem] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSalvarEdicao = () => {
    if (!idItem || !nome) {
      Alert.alert('Atenção', 'Por favor, informe o ID do item e o nome.');
      return;
    }

    // Aqui podes colocar a lógica de requisição PUT/POST para a tua API se necessário
    Alert.alert('Sucesso', `Item ${idItem} atualizado com sucesso!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075BB5" />
      
      {/* Cabeçalho Padronizado */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Image 
            source={logoSenai} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.btnSair} onPress={onNavegar}>
            <Text style={styles.btnSairText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Editar Item do Estoque</Text>
      </View>

      {/* Conteúdo Principal / Formulário */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
            multiline={true}
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
                keyboardType="numeric"
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

          <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarEdicao}>
            <Text style={styles.btnSalvarText}>Salvar Alterações</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  btnSalvarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});