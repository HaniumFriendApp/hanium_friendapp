import React, { useEffect, useState } from 'react';
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
  Body,
} from 'native-base';
import CardComponent from '../components/CardComponent';
import ImageComponent from '../components/ImageComponent';
import HeaderComponent from '../components/HeaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
const my = require('../assets/dog.jpg');
const imageWidth = Dimensions.get('window').width / 3;

export default function ServiceCenter({ navigation }) {
  const [qna, setQna] = useState([]);
  const [faq, setFaq] = useState([]);
  const pageSize = 4;

  const getPageToData = (pageNumber, name) => {
    if (name === 'qna') {
      setQna(qnaData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
    } else {
      setFaq(faqData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
    }
  };

  useEffect(() => {
    getPageToData(1, 'qna');
    getPageToData(1, 'faq');
  }, []);

  return (
    <Container>
      <Header transparent style={{ backgroundColor: '#FFEB99' }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-back" style={{ color: 'black' }} />
          </Button>
        </Left>
        <Body>
          <Text style={styles.title}>| 고객센터 |</Text>
        </Body>
        <Right />
      </Header>
      <View style={styles.header}>
        <Thumbnail large source={my} style={styles.thumbnail} />
        <Text style={styles.nameText}>한이음</Text>
      </View>
      <Content>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>Q&A </Text>
          <TouchableOpacity onPress={() => navigation.push('WriteQuestion')}>
            <Text>글쓰기</Text>
          </TouchableOpacity>
        </View>
        {qna.map((title) => (
          <TouchableOpacity
            style={styles.item2}
            onPress={() => navigation.navigate('EditPage')}
          >
            <Text style={styles.item2Text}>{title.title}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.buttonWrapper}>
          {[1, 2, 3, 4].map((num) => (
            <TouchableOpacity
              onPress={() => getPageToData(num, 'qna')}
              style={styles.button}
            >
              <Text>{num.toString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.item1}>
          <Text style={styles.item1Text}>FAQ </Text>
          <TouchableOpacity onPress={() => navigation.push('WriteQuestion')}>
            <Text>글쓰기</Text>
          </TouchableOpacity>
        </View>
        {faq.map((title) => (
          <TouchableOpacity style={styles.item2}>
            <Text style={styles.item2Text}>{title.title}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.buttonWrapper}>
          {[1, 2, 3, 4].map((num) => (
            <TouchableOpacity
              onPress={() => getPageToData(num, 'faq')}
              style={styles.button}
            >
              <Text>{num.toString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonCenter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    paddingLeft: 4,
    marginTop: 12,
    flexDirection: 'row',
  },
  button: {
    borderColor: '#7a7a7a',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#e6f39d',
    marginRight: 4,
  },
  thumbnail: { alignSelf: 'center' },
  myTitle: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#401201',
    textAlign: 'center',
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
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
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
    height: 45,
    marginBottom: 5,
    marginTop: 35,
    paddingLeft: 25,
  },
  item1Text: {
    fontSize: 21,
    fontWeight: '700',
    color: 'black',
  },
  item2: {
    paddingVertical: 4,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingLeft: 25,
  },
  item2Text: {
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
  },
});

const qnaData = [
  {
    title: 'qwe123',
  },
  {
    title: 'asdasdqwe',
  },
  {
    title: 'sacqwf1v',
  },
  {
    title: '4twgrb',
  },
  {
    title: 'qwerqwsv',
  },
  {
    title: 'qwer12f',
  },
  {
    title: 'qwe123',
  },
  {
    title: 'nyuem7mtny',
  },
  {
    title: 'vbetrbi',
  },
  {
    title: 'tg23gnv',
  },
  {
    title: '12ei0',
  },
  {
    title: 'sdfvdfv',
  },
  {
    title: 'qwed12f',
  },
  {
    title: '43gevrbfd',
  },
  {
    title: 'wrgni',
  },
  {
    title: 'qwe123',
  },
];

const faqData = [
  {
    title: 'qwe123',
  },
  {
    title: 'asdasdqwe',
  },
  {
    title: 'sacqwf1v',
  },
  {
    title: '4twgrb',
  },
  {
    title: 'qwerqwsv',
  },
  {
    title: 'qwer12f',
  },
  {
    title: 'qwe123',
  },
  {
    title: 'nyuem7mtny',
  },
  {
    title: 'vbetrbi',
  },
  {
    title: 'tg23gnv',
  },
  {
    title: '12ei0',
  },
  {
    title: 'sdfvdfv',
  },
  {
    title: 'qwed12f',
  },
  {
    title: '43gevrbfd',
  },
  {
    title: 'wrgni',
  },
  {
    title: 'qwe123',
  },
];
