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
import RNPickerSelect from 'react-native-picker-select';

import ItemInput from '../components/ItemInput';
import { registration } from '../config/firebaseFunctions'; //백엔드
import { color } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import PasswordInput from 'react-native-password-eye';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export default function EditPage({ navigation }) {
  const [id, setID] = useState('한이음');
  const [idError, setIDError] = useState('');

  const [nickName, setNickName] = useState('한이음');
  const [nickNameError, setNickNameError] = useState('');

  const [password, setPassword] = useState('qwer1234');
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('qwer1234');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [age, setAge] = useState('21');
  const [ageError, setAgeError] = useState('');

  const [phonenumber1, setPhoneNumber1] = useState('010');
  const [phonenumber2, setPhoneNumber2] = useState('1234');
  const [phonenumber3, setPhoneNumber3] = useState('5678');
  const [phonenumberError, setPhoneNumberError] = useState('');

  const [email, setEmail] = useState('qwer1234');
  const [emailError, setEmailError] = useState('');

  const [emailEnd, setEmailEnd] = useState('@naver.com');
  const [image, setImage] = useState(tempImage);
  const [imageUri, setImageUri] = useState('');
  const [modalT, setModalT] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const tempImage =
    'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('회원가입을 위해 사진첩 권한이 필요합니다.');
      }
    }
  };
  const pickImage = async () => {
    await getPermission();
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1, //올리면 퀄리티도 올라가지만 용량도 올라감
    });

    if (imageData.cancelled) return;

    getImageUrl(imageData);
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  const idCheck = () => {
    if (Math.random() * 2 > 1) {
      setModalT('아이디가 중복됩니다.');
    } else setModalT('아이디 사용이 가능합니다');
    setModalVisible(true);
  };

  const doSignUp = async () => {
    if (id == '') {
      setModalT('아이디를 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setIDError('');
    }

    if (nickName == '') {
      setModalT('이름을 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setNickNameError('');
    }

    if (password == '') {
      setModalT('비밀번호를 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setPasswordError('');
    }

    if (passwordConfirm == '') {
      setModalT('비밀번호 확인을 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setPasswordConfirmError('');
    }

    if (age == '') {
      setModalT('나이를 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setAgeError('');
    }

    if (phonenumber1 == '' || phonenumber2 == '' || phonenumber3 == '') {
      setModalT('전화번호를 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setPhoneNumberError('');
    }

    if (email == '' || emailEnd == '') {
      setModalT('이메일을 입력해 주세요');
      setModalVisible(true);
      return false;
    } else {
      setEmailError('');
    }

    if (password !== passwordConfirm) {
      setModalT('비밀번호가 서로 일치 하지 않습니다.');
      setModalVisible(true);
      return false;
    } else {
      setPasswordConfirmError('');
    }
    registration(nickName, email + '@' + emailEnd, password); //간단하게 테스트 하기위해 이렇게 사용. 실제로는 아래 주석함수를 사용해야함.

    let date = new Date();
    let getTime = date.getTime();
    let data = {
      image: image,
      id: id,
      nickName: nickName,
      password: password,
      age: age,
      phonenumber: phonenumber1 + phonenumber2 + phonenumber3,
      date: getTime,
      email: email + '@' + emailEnd,
    };
    const response = await fetch(imageUri);
    const blob = response.blob();
    // const imageUrl = await imageUpload(blob, getTime);// 이미지 업로드 하는 firebase백엔드함수 (springboot용으로 수정해야됨.->백엔드)
    data.image = imageUrl;
    // registration(data); //실제로는 이렇게 들어가는백엔드 함수가 있어야 한다.!!!!! 수정!!->백엔드
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={styles.background}>
          <Header transparent style={{ backgroundColor: '#FFEB99' }}>
            <Body>
              <Text style={styles.title}>| 정보수정 |</Text>
            </Body>
            <Right />
          </Header>
          {modalVisible && (
            <View style={styles.modalWrapper}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>{modalT}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Content contentContainerStyle={styles.content} scrollEnabled={true}>
            <Form style={styles.form}>
              {imageUri == '' ? (
                <Grid style={styles.imageUpload} onPress={() => pickImage()}>
                  <Text style={styles.imageUploadPlus}>+</Text>
                </Grid>
              ) : (
                <TouchableOpacity onPress={() => pickImage()}>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.imagePreview}
                  />
                </TouchableOpacity>
              )}
              <Grid style={styles.formGrid}>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>아이디</Text>
                  </Col>
                  <Col style={styles.rightCol}>
                    <TextInput
                      editable={false}
                      style={{ ...styles.colInput, width: '60%' }}
                      type="text"
                      onChangeText={setID}
                      value={id}
                      maxLength={13}
                    />
                    <TouchableOpacity
                      onPress={idCheck}
                      style={styles.checkButton}
                    >
                      <Text>중복 확인</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>이름</Text>
                  </Col>
                  <Col style={styles.rightCol}>
                    <TextInput
                      style={styles.colInput}
                      type="text"
                      onChangeText={setNickName}
                      value={nickName}
                    />
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>비밀번호</Text>
                  </Col>
                  <Col style={styles.rightCol}>
                    <PasswordInput
                      containerStyles={styles.colInput}
                      inputStyle={{ fontSize: 20 }}
                      onChangeText={setPassword}
                      secureTextEntry={true}
                    />
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>비밀번호{'\n'}확인</Text>
                  </Col>
                  <Col style={styles.rightCol}>
                    <PasswordInput
                      containerStyles={styles.colInput}
                      inputStyle={{ fontSize: 20 }}
                      onChangeText={setPasswordConfirm}
                      secureTextEntry={true}
                    />
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>나이</Text>
                  </Col>
                  <Col
                    style={{ ...styles.rightCol, justifyContent: 'flex-start' }}
                  >
                    <TextInput
                      style={{ ...styles.colInput, width: 40 }}
                      type="text"
                      onChangeText={setAge}
                      value={age}
                    />
                    <Text> 세</Text>
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>전화번호</Text>
                  </Col>
                  <Col style={styles.rightCol}>
                    <TextInput
                      style={{ ...styles.colInput, width: '27%' }}
                      type="number"
                      onChangeText={setPhoneNumber1}
                      value={phonenumber1}
                    />
                    <Text> - </Text>
                    <TextInput
                      style={{ ...styles.colInput, width: '27%' }}
                      type="number"
                      onChangeText={setPhoneNumber2}
                      value={phonenumber2}
                    />
                    <Text> - </Text>
                    <TextInput
                      style={{ ...styles.colInput, width: '27%' }}
                      type="number"
                      onChangeText={setPhoneNumber3}
                      value={phonenumber3}
                    />
                  </Col>
                </Row>
                <Row style={{ ...styles.row, borderBottomWidth: 0 }}>
                  <Col style={styles.leftCol}>
                    <Text style={styles.colText}>이메일</Text>
                  </Col>
                  <Row style={{ flexDirection: 'column' }}>
                    <Col style={styles.rightCol}>
                      <TextInput
                        style={{ ...styles.colInput, width: '40%' }}
                        type="text"
                        onChangeText={setEmail}
                        value={email}
                      />
                      <Text> @ </Text>
                      <TextInput
                        style={{ ...styles.colInput, width: '40%' }}
                        type="text"
                        onChangeText={setEmailEnd}
                        value={emailEnd}
                      />
                    </Col>
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      placeholder={{
                        label: '이메일 입력',
                        value: null,
                        color: 'black',
                      }}
                      items={[
                        {
                          label: 'naver.com',
                          value: 'naver.com',
                        },
                        {
                          label: 'gmail.com',
                          value: 'gmail.com',
                        },
                        {
                          label: 'daum.net',
                          value: 'daum.net',
                        },
                        {
                          label: 'yahoo.com',
                          value: 'yahoo.com',
                        },
                        {
                          label: 'nate.com',
                          value: 'nate.com',
                        },
                      ]}
                      onValueChange={setEmailEnd}
                      Icon={() => {
                        return (
                          <View
                            style={{
                              backgroundColor: 'transparent',
                              borderTopWidth: 10,
                              borderTopColor: 'gray',
                              borderRightWidth: 10,
                              borderRightColor: 'transparent',
                              borderLeftWidth: 10,
                              borderLeftColor: 'transparent',
                              width: 0,
                              height: 0,
                              marginTop: 6,
                              marginRight: 3,
                            }}
                          />
                        );
                      }}
                    />
                  </Row>
                </Row>
              </Grid>
            </Form>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Button full style={styles.emailSignUp} onPress={doSignUp}>
                <Text style={{ color: 'black' }}>수정</Text>
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
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#999',
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
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
    //  backgroundColor: 'rgba(52, 52, 52, 0.5)',
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#401201',
    textAlign: 'center',
  },
  highlite: {
    fontSize: 25,
    fontWeight: '700',
    color: 'deeppink',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    borderRadius: 10,
    paddingBottom: 20,
    marginTop: 10,
  },

  snsSignUp: {
    alignSelf: 'center',
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#4667A5',
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
  imageUpload: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  leftCol: {
    width: 70,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colText: {
    fontSize: 20,
    textAlign: 'center',
  },
  row: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  rightCol: {
    display: 'flex',
    alignItems: 'center',
    padding: 7,
    flexDirection: 'row',
  },
  colInput: {
    width: '100%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formGrid: {
    width: '100%',
    borderTopColor: '#999',
    borderBottomColor: '#999',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    paddingVertical: 4,
  },
  checkButton: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#999',
  },
  inputS: {
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    paddingRight: 24,
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    padding: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    paddingRight: 24,
    width: '100%',
    maxWidth: Dimensions.get('window').width,
  },
});
