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
  StatusBar
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
  
} from 'native-base';
import user from '../assets/user';

const databaseURL = "https://active-tome-322009-default-rtdb.firebaseio.com/";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      words: {},
      inputword: "",
      showing: "비활성",
      showingbool: false,
      searchCata: "이름",
      searchCatabool: false,
      username:"한이음"
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
      method: "DELETE",
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
  
  //아이디,이름 검색 switch
  onchangeCata() {
    if (this.state.searchCata == "아이디") {
      this.setState({ searchCata: "이름" });
    } else {
      this.setState({ searchCata: "아이디" });
    }
  }
  //검색창 활성,비활성
  onshowinput() {
    const { showingbool } = this.state;
    if (this.state.showing == "비활성") {
      this.setState({ showing: "활성" });
    } else {
      this.setState({ showing: "비활성" });
    }
    this.setState({ showingbool: !showingbool });
  }

  render() {
    const { inputword, showingbool } = this.state;
    //{map.userimage}로 받은 이미지 대체
    const userimage = { uri: "https://reactnative.dev/img/tiny_logo.png" };
    return (
      <SafeAreaView>
        <View style={styles.row}>
          {showingbool && (
            <TextInput
              value={inputword}
              onChangeText={(text) => {
                this.setState({ inputword: text });
              }}
              style={{ height: 40 }}
              placeholder="입력하시오"
            />
          )}
          <Text>
            <Button
              title={this.state.searchCata}
              onPress={() => {
                this.onchangeCata();
              }}
            ></Button>
            <Button
              title={this.state.showing}
              onPress={() => {
                this.onshowinput();
              }}
            ></Button>
            <Button
              title="검색"
              onPress={() => {
                if (inputword == "") {
                  return Alert.alert("주의", "검색할 친구를입력하시오", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                }
                this.setState({ inputword: "" });
                this.props.navigation.navigate("FriendAddPage", {
                  inputword: inputword,
                  searchCata: this.state.searchCata,
                });
              }}
            />
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
            <Text >{this.state.username}</Text>
        </View>
        <Text>친구 리스트</Text>
        <ScrollView>
          {Object.keys(this.state.words).map((id) => {
            const word = this.state.words[id];
            return (
              <View key={id}>
                <Text>
                  <Image style={{ width: 30, height: 30 }} source={userimage} />
                  <Button
                    title="삭제"
                    onPress={() => {
                      this._delete(id);
                    }}
                  ></Button>
                  <Text>name : {word.name}</Text>
                  // <Text>id : {word.id}</Text>
                  <Button title="전화" onPress={()=>{
                    this.props.navigation.navigate("FaceChatPage");
                  }}></Button>
                  <Button title="문자" onPress={()=>{
                    this.props.navigation.navigate("ChatPage");
                  }}></Button>
                </Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
export default MainPage
