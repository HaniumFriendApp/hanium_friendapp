import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Content,
  Card,
  CardItem,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
  Form,
  Text,
  Item,
  Input,
  Label,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Avatar,
} from 'native-base';
import ChatDetailPage from '../pages/ChatDetailPage';
import { Title } from 'react-native-paper';

const Messages = [
  {
    id: '1',
    userName: 'Hey Mama',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__340.png',
    },
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Nan Goyangee',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2018/07/16/15/31/dog-3542195__340.png',
    },
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Chris Mas',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2016/05/30/13/52/dog-1424758__340.png',
    },
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Pizza Hot',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2017/09/05/23/07/dog-2719601__340.jpg',
    },
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Gogo Ring',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2012/04/16/11/18/dog-35553__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '6',
    userName: 'Mamma Mia',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2017/10/03/00/29/low-poly-2810932__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '7',
    userName: 'Lala Bla',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2017/01/31/18/46/corgi-2026347__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '8',
    userName: 'Hula hup',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2017/07/05/14/34/dog-2474784__340.jpg',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.{\n}fffffffffffffffffffffffffffffffffffffffff{\n}eeeeeeeeeeeeeeeeeeeeee',
  },
  {
    id: '59',
    userName: 'Dog Lover',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2017/11/22/16/04/pug-2970825__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '10',
    userName: 'Very Pepi',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2018/03/30/02/30/color-dogs-3274248__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '11',
    userName: 'Gon Dola',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2015/02/13/16/40/doggy-635410__340.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '12',
    userName: 'Lets Dance',
    userImg: {
      uri: 'https://cdn.pixabay.com/photo/2018/10/10/10/56/dog-3736945__340.jpg',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

export default function ChatPage({ navigation }) {
  return (
    <Container style={styles.container}>
      <Header style={styles.header} transparent>
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
          <Title>개인</Title>
        </Body>
        <Right />
      </Header>

      <FlatList
        style={styles.flatlist}
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatDetailPage');
            }}
          >
            <Card style={styles.card} transparent>
              <CardItem transparent style={styles.userInfo}>
                <Form style={styles.userImgWrapper}>
                  <Image source={item.userImg} style={styles.UserImg} />
                </Form>
                <Form style={styles.textWrapper}>
                  <Text style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.userName}</Text>
                    <Text style={styles.PostTime}>{item.messageTime}</Text>
                  </Text>
                  <Text style={styles.MessageText} numberOfLines={2}>
                    {item.messageText}
                  </Text>
                </Form>
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFEB99',
    alignItems: 'center',
  },
  flatlist: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#696969',
    marginTop: -3,
    marginBottom: -3,
  },
  userImgWrapper: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#808080',
    borderWidth: 1,
  },
  textWrapper: {
    flex: 4,
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingLeft: 0,
    marginLeft: 10,
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  MessageText: {
    fontSize: 14,
    color: '#333',
  },
});
