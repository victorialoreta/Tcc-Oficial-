
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
  Modal,
  Image,
  Alert
} from 'react-native';

const API_URL = "http://10.154.20.24:5000";

const DADOS_EXEMPLO = [
  {
    id: '1',
    nome: 'Parafuso',
    descricao: 'Utilizado para fixação e montagem de peças.',
    quantidade: 400,
    preco: '0.50',
    categoria: 'Miscelaneas',
    fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-QUTVAH8t85giNKK4ouuoGrCPRAv89r-Zde8WmvsSShXpRynCaCoOuM&s=10'
  },
  {
    id: '2',
    nome: 'Alicate',
    descricao: 'Ferramenta usada para segurar, cortar ou dobrar materiais.',
    quantidade: 20,
    preco: '30.00',
    categoria: 'Ferramenta',
    fotoUrl: 'https://www.eletrosina.com.br/52-large_default/alicate-univ-8-loyal.jpg'
  },
  {
    id: '3',
    nome: 'Chave de fenda',
    descricao: 'Ferramenta usada para apertar e soltar parafusos.',
    quantidade: 15,
    preco: '20.00',
    categoria: 'Ferramenta',
    fotoUrl: 'https://static.felap.com.br/public/felap/imagens/produtos/chave-de-fenda-5-16-x-10-114115m-mayle-65fc1f7887d00.jpg'
  },
  {
    id: '4',
    nome: 'Fita crepe',
    descricao: 'Fita adesiva utilizada para proteção e marcação.',
    quantidade: 5,
    preco: '15.00',
    categoria: 'Pintura',
    fotoUrl: 'https://images.tcdn.com.br/img/img_prod/1098943/fita_crepe_adesiva_24x45mt_koretech_4und_3309_1_d3cb131146405ee3202c6f0c7a40e82c.jpg'
  },
  {
    id: '5',
    nome: 'Teclado',
    descricao: 'Dispositivo de entrada para digitação em computadores.',
    quantidade: 6,
    preco: '150.00',
    categoria: 'Informática',
    fotoUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
];

export default function Estoque({ onNavegar, onIrParaEditar }) {

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // VOLTAR PARA LOGIN
  const voltarParaLogin = () => {
    console.log('Clicou em Login');

    if (typeof onNavegar === 'function') {
      onNavegar();
    } else {
      Alert.alert(
        'Erro',
        'A navegação para Login não foi configurada no App.js.'
      );
    }
  };

  // IR PARA EDITAR
  const irParaEditar = () => {
    console.log('Clicou em Editar');

    if (typeof onIrParaEditar === 'function') {
      onIrParaEditar();
    }
  };

  // CARREGAR ESTOQUE
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

  // ABRIR FOTO
  const abrirFoto = (item) => {
    setItemSelecionado(item);
    setModalVisivel(true);
  };

  // EXIBIR CADA PRODUTO
  const renderItem = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.cardHeader}>

        <View style={styles.badgeId}>
          <Text style={styles.badgeIdText}>
            {item.id}
          </Text>
        </View>

        <Text style={styles.nomeItem}>
          {item.nome}
        </Text>

        <Text style={styles.categoriaItem}>
          {item.categoria}
        </Text>

      </View>

      <Text style={styles.descricaoItem}>
        {item.descricao}
      </Text>

      <View style={styles.cardDetails}>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>QTD</Text>
          <Text style={styles.detailValue}>
            {item.qtde}
          </Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>PREÇO</Text>
          <Text style={styles.detailValue}>
            R$ {Number(item.preco).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btnFoto}
          onPress={() => abrirFoto(item)}
        >
          <Text style={styles.btnFotoText}>
            Foto
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#075BB5"
      />

      {/* CABEÇALHO */}

      <View style={styles.header}>

        <View style={styles.headerTopRow}>

          <Text style={styles.logoText}>
            SENAI
          </Text>

          <View style={styles.headerRightButtons}>

           {/* botão login  */}
          <TouchableOpacity
              style={styles.btnEditarTopo}
              activeOpacity={0.6}
              onPress={() => {
                console.log('CLICOU NO LOGIN');

                if (typeof onNavegar === 'function') {
                  onNavegar();
                }
              }}
            >
              <Text style={styles.btnEditarTopoText}>Login</Text>
            </TouchableOpacity>


            {/* botão editar */}

            <TouchableOpacity
              style={styles.btnEditar}
              activeOpacity={0.6}
              onPress={irParaEditar}
            >
              <Text style={styles.btnEditarText}>
                Editar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        <Text style={styles.headerTitle}>
          Controle de Estoque
        </Text>

      </View>

      {/* CONTEÚDO PRINCIPAL */}

      <View style={styles.content}>

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#F45B2A"
            style={{ marginTop: 40 }}
          />

        ) : (

          <FlatList
            data={itens}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 30 }}>
                Nenhum item encontrado.
              </Text>
            }
          />

        )}

      </View>

      {/* MODAL DA FOTO */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              {itemSelecionado
                ? itemSelecionado.nome
                : 'Foto do Item'}
            </Text>

            {itemSelecionado && (

              <Image
                source={{
                  uri: itemSelecionado.fotoUrl ||
                    'https://via.placeholder.com/300'
                }}
                style={styles.modalImage}
                resizeMode="cover"
              />

            )}

            <TouchableOpacity
              style={styles.btnCloseModal}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.btnCloseModalText}>
                Fechar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

// ESTILOS

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

  headerRightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },

  btnEditarTopo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },

  btnEditarTopoText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  btnEditar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  btnEditarText: {
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
    color: '#075BB5',
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
    backgroundColor: '#F45B2A',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  btnFotoText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#075BB5',
    marginBottom: 15,
  },

  modalImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
  },

  btnCloseModal: {
    backgroundColor: '#075BB5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },

  btnCloseModalText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

});
