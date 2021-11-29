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
    'data:image/jpeg;base64,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';

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
