import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, Dimensions } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Right,
} from 'native-base';
import { Picker } from '@react-native-picker/picker';
import { DeleteUser } from '../config/firebaseFunctions';
import { logout } from '../config/firebaseFunctions';

import * as firebase from 'firebase';
import 'firebase/firestore';

import ItemInput from '../components/ItemInput';
import { color } from 'react-native-reanimated';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export default function SignDeletePage({ navigation }) {
  const [selectedValue, setSelectedValue] = useState('탈퇴 사유');

  const imageUri =
    'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913__340.jpg';

  const signOutFunc = () => {
    Alert.alert('탈퇴되었습니다!');
    logout(navigation);
  };

  useEffect(() => {}, []);

  const signOut = async () => {
    console.log('탈퇴!!');
    const currentUser = firebase.auth().currentUser;
    let date = new Date();
    let data = {
      UserEmail: currentUser.email,
      uid: currentUser.uid,
      date: date.getTime(),
      reason: selectedValue,
    };
    console.log('탈퇴fire');
    let result = DeleteUser(navigation, data);
  };

  return (
    <Container style={styles.container}>
      <View style={styles.background}>
        <Header transparent style={{ backgroundColor: '#FFEB99' }}>
          <Body>
            <Text style={styles.title}>| 탈퇴 |</Text>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={true}>
          <Form style={styles.form}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Form style={styles.formBorder}>
              <Text style={styles.text}>
                탈퇴 시 친추, 채팅 기록 및 대화 방 등 모든 정보가 삭제 됩니다!
              </Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item label="탈퇴 사유" value="" enabled={false} />
                  <Picker.Item
                    label="컨텐츠가 재미 없음"
                    value="컨텐츠가 재미 없음"
                  />
                  <Picker.Item
                    label="사용 빈도가 낮음"
                    value="사용 빈도가 낮음"
                  />
                  <Picker.Item
                    label="개인정보 유출 우려"
                    value="개인정보 유출 우려"
                  />
                  <Picker.Item
                    label="유해 사이트로 생각"
                    value="유해 사이트로 생각"
                  />
                </Picker>
              </View>
            </Form>
          </Form>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button full style={styles.emailSignUp} onPress={signOutFunc}>
              <Text style={{ color: 'black' }}>탈퇴</Text>
            </Button>
            <Button
              full
              style={{ ...styles.emailSignUp, backgroundColor: '#333' }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ color: 'white' }}>취소</Text>
            </Button>
          </View>
        </Content>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#401201',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    borderRadius: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  image: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 50,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 3,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  formBorder: {
    width: '100%',
    borderTopColor: '#999',
    borderBottomColor: '#999',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    padding: 30,
  },
  emailSignUp: {
    alignSelf: 'center',
    width: '30%',
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFEB99',
  },
  picker: {
    padding: 10,
    margin: 20,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});
