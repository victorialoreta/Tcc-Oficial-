import React, { useState } from 'react';

const API_URL = "http://10.154.20.73:5000";

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';

const API_URL = "http://10.154.20.73:5000";

// Dados iniciais de fallback caso a API não esteja ligada (baseados na tua tabela)
const DADOS_EXEMPLO = [
  { id: '1', nome: 'Parafuso', descricao: 'Utilizado para fixação e montagem de peças.', quantidade: 400, preco: '0.50', categoria: 'Miscelaneas' },
  { id: '2', nome: 'Alicate', descricao: 'Ferramenta usada para segurar, cortar ou dobrar materiais.', quantidade: 20, preco: '30.00', categoria: 'Ferramenta' },
  { id: '3', nome: 'Chave de fenda', descricao: 'Ferramenta usada para apertar e soltar parafusos.', quantidade: 15, preco: '20.00', categoria: 'Ferramenta' },
  { id: '4', nome: 'Fita crepe', descricao: 'Fita adesiva utilizada para proteção e marcação.', quantidade: 5, preco: '15.00', categoria: 'Pintura' },
  { id: '5', nome: 'Teclado', descricao: 'Dispositivo de entrada para digitação em computadores.', quantidade: 6, preco: '150.00', categoria: 'Informática' },
];

export default function Estoque({ navigation }) {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Procura os dados na API ou carrega o exemplo em caso de falha de conexão
  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    try {
      const response = await fetch(`${API_URL}/estoque`);
      if (response.ok) {
        const data = await response.json();
        setItens(data);
      } else {
        setItens(DADOS_EXEMPLO);
      }
    } catch (error) {
      console.log('A usar dados locais:', error);
      setItens(DADOS_EXEMPLO);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badgeId}>
          <Text style={styles.badgeIdText}>#{item.id}</Text>
        </View>
        <Text style={styles.nomeItem}>{item.nome}</Text>
        <Text style={styles.categoriaItem}>{item.categoria}</Text>
      </View>

      <Text style={styles.descricaoItem}>{item.descricao}</Text>

      <View style={styles.cardDetails}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>QTD</Text>
          <Text style={styles.detailValue}>{item.quantidade}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>PREÇO</Text>
          <Text style={styles.detailValue}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
          style={styles.btnFoto} 
          onPress={() => alert(`Foto do item: ${item.nome}`)}
        >
          <Text style={styles.btnFotoText}>Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0056b3" />
      
      {/* Cabeçalho no estilo SENAI */}
      <View style={styles.header}>
        <Text style={styles.logoText}>SENAI</Text>
        <Text style={styles.headerTitle}>Controlo de Estoque</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff5722" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={itens}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0056b3', // Azul principal igual à tela de login
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#0056b3',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 4,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#f4f6f9', // Fundo claro para contrastar os cartões da lista
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeId: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeIdText: {
    color: '#0056b3',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  categoriaItem: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  descricaoItem: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  detailBox: {
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 10,
    color: '#888888',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  btnFoto: {
    backgroundColor: '#ff5722', // Laranja igual ao botão de login
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  btnFotoText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});