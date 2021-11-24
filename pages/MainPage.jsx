import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
  Button,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Left, Right, Text } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Constants from 'expo-constants';

const databaseURL = 'https://friendadd-72871-default-rtdb.firebaseio.com/';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      words: {},
      inputword: '',
      showing: '비활성',
      showingbool: true,
      searchCata: '이름',
      searchCatabool: false,
      username: 'name',
    };
  }

  //내 친구 목록에 있는 list들을 words에 저장
  _get() {
    fetch(`${databaseURL}/words.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((words) => this.setState({ words: words }));
  }
  // _getUserName(){
  //   fetch(`${databaseURL}/username.json`)
  //   .then((res) => {
  //     if (res.status != 200) {
  //       throw new Error(res.statusText);
  //     }
  //     return res.json();
  //   })
  //   .then((username) => this.setState({ username: username }));
  // }

  //해당 data를 list에서 삭제
  _delete(id) {
    return fetch(`${databaseURL}/words/${id}.json`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.words;
        delete nextState[id];
        this.setState({ words: nextState });
      });
  }

  componentDidMount() {
    this.props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    this._get();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.words != this.state.words) {
      this._get();
    }
  }

  //아이디,이름 검색 switch
  onchangeCata() {
    if (this.state.searchCata == '아이디') {
      this.setState({ searchCata: '이름' });
    } else {
      this.setState({ searchCata: '아이디' });
    }
  }
  //검색창 활성,비활성
  onshowinput() {
    const { showingbool } = this.state;
    if (this.state.showing == '비활성') {
      this.setState({ showing: '활성' });
    } else {
      this.setState({ showing: '비활성' });
    }
    this.setState({ showingbool: !showingbool });
  }

  render() {
    const { inputword, showingbool } = this.state;
    //{map.userimage}로 받은 이미지 대체
    const userimage = { uri: 'https://reactnative.dev/img/tiny_logo.png' };
    return (
      <SafeAreaView
        style={{
          paddingTop: Constants.statusBarHeight,
          paddingBottom: 40,
        }}
      >
        <View>
          <View
            style={[
              {
                backgroundColor: '#FFEB99',
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
          >
            <TouchableOpacity style={{ marginRight: 30 }}>
              <Icon name="bars" size={30} color="#black" />
            </TouchableOpacity>
            {showingbool && (
              <>
                <>
                  <Icon name="user" size={20} color="grey" />
                  <TextInput
                    value={inputword}
                    onChangeText={(text) => {
                      this.setState({ inputword: text });
                    }}
                    style={{
                      height: 30,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderColor: 'grey',
                      borderRadius: 10,
                      color: 'grey',
                    }}
                    placeholder="이름/아이디를 입력하시오"
                  />
                </>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    padding: 5,
                  }}
                  onPress={() => {
                    if (inputword == '') {
                      return Alert.alert('주의', '검색할 친구를입력하시오', [
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                        },
                      ]);
                    }
                    this.setState({ inputword: '' });
                    this.props.navigation.navigate('FriendAddPage', {
                      inputword: inputword,
                      searchCata: this.state.searchCata,
                    });
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10 }}>search</Text>
                </TouchableOpacity>
              </>
            )}
            <View style={styles.iconposition}>
              <TouchableOpacity>
                <Icon name="bells" size={30} color="#black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 3 }}>
                <Icon
                  name="search1"
                  size={30}
                  color="black"
                  onPress={() => this.onshowinput()}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.listcontainer, styles.profile]}>
          <Image
            style={[styles.imagestyle, { borderWidth: 2 }]}
            source={userimage}
          />
          <View>
            <Text>name</Text>
            <Text>상태메세지</Text>
          </View>
        </View>
        <Text style={{ paddingLeft: 10 }}>친구 </Text>
        <View style={styles.underlinestyle} />
        <ScrollView>
          {Object.keys(this.state.words).map((id) => {
            const word = this.state.words[id];
            return (
              <View key={id}>
                <View style={styles.row}>
                  <Image
                    style={[styles.imagestyle, { borderWidth: 2 }]}
                    source={userimage}
                  />
                  <Button
                    title="delete"
                    onPress={() => {
                      this._delete(id);
                    }}
                  ></Button>
                  <View>
                    <Text>{word.name}</Text>
                    <Text>상태메세지</Text>
                  </View>
                  <View style={styles.iconposition}>
                    <TouchableOpacity>
                      <Icon
                        name="phone"
                        size={30}
                        color="#black"
                        onPress={() => {
                          this.props.navigation.navigate('FaceChatPage');
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconaling}>
                      <Icon
                        name="message1"
                        size={30}
                        color="#black"
                        onPress={() => {
                          this.props.navigation.navigate('ChatPage');
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.underlinestyle} />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F6F6F6',
    height: 70,
    borderRadius: 10,
    marginTop: 50,
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  profile: {
    backgroundColor: '#F0F0F0',
    width: '80%',
    marginHorizontal: 40,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',

    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 10.25,
    shadowRadius: 10.84,
  },

  listcontainer: {
    flexDirection: 'row',
  },

  imagestyle: {
    margin: 5,
    marginRight: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconposition: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  iconaling: {
    marginLeft: 5,
  },
  underlinestyle: {
    borderBottomColor: '#CED4BE',
    borderBottomWidth: 1,
    margin: 2,
  },
});
export default MainPage;
