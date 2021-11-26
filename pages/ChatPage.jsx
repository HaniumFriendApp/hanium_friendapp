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
    userName: 'Jenny Doe',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/01/urbanbrush-20190108131811238895.png',
    },
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '6',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '7',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '8',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.{\n}fffffffffffffffffffffffffffffffffffffffff{\n}eeeeeeeeeeeeeeeeeeeeee',
  },
  {
    id: '59',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '10',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '11',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
    },
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '12',
    userName: 'Christy Alex',
    userImg: {
      uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190408073012983262.png',
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
