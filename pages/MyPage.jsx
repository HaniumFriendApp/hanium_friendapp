import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
  Thumbnail,
} from 'native-base';
import CardComponent from '../components/CardComponent';
import ImageComponent from '../components/ImageComponent';
import HeaderComponent from '../components/HeaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
const my = require('../assets/my.png');

const imageWidth = Dimensions.get('window').width / 3;
import { logout } from '../config/firebaseFunctions';
import * as Icons from '../assets';

export default function MyPage({ navigation }) {
  const logoutFunc = () => {
    logout(navigation);
  };
  const changeinfoFunc = () => {
    navigation.navigate('ChangeInfoPage');
  };
  return (
    <Container>
      <View style={styles.header}>
        <Thumbnail large source={my} style={styles.thumbnail} />
        <Text style={styles.nameText}>Name</Text>
      </View>
      {/* <HeaderComponent /> */}
      <Content>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>개인 정보</Text>
        </View>
        <TouchableOpacity
          style={styles.item2}
          onPress={() => navigation.navigate('EditPage')}
        >
          <Text style={styles.item2Text}>정보수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item2}
          onPress={() => navigation.navigate('SignDeletePage')}
        >
          <Text style={styles.item2Text}>탈퇴</Text>
        </TouchableOpacity>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>알림</Text>
        </View>
        <TouchableOpacity
          style={styles.item2}
          onPress={() => navigation.navigate('AlarmPage')}
        >
          <Text style={styles.item2Text}>알림 설정</Text>
        </TouchableOpacity>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>정보</Text>
        </View>
        <TouchableOpacity style={styles.item2}>
          <Text style={styles.item2Text}>앱 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('ServiceCenter')}
          style={styles.item2}
        >
          <Text style={styles.item2Text}>고객 센터</Text>
        </TouchableOpacity>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>기타</Text>
        </View>
        <TouchableOpacity onPress={logoutFunc} style={styles.item2}>
          <Text style={styles.item2Text}>로그아웃</Text>
        </TouchableOpacity>
        {}
        {}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  thumbnail: { alignSelf: 'center' },
  myTitle: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  category: { fontWeight: '700' },
  categoryContent: { color: 'deeppink', fontWeight: '700' },
  imageWrap: { flexWrap: 'wrap', marginTop: 20 },
  logout: {
    alignSelf: 'center',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFEB99',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#552A14',
    marginLeft: 10,
  },
  item1: {
    width: '100%',
    paddingVertical: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 5,
    marginTop: 25,
    paddingLeft: 25,
  },
  item1Text: {
    fontSize: 23,
    fontWeight: '700',
    color: 'black',
  },
  item2: {
    marginHorizontal: 30,
    paddingVertical: 4,
    maxWidth: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingLeft: 6,
  },
  item2Text: {
    fontSize: 21,
    fontWeight: '700',
    color: 'black',
  },
});
