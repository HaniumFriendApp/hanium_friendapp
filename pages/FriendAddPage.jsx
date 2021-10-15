import * as React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";

const databaseURL = "https://active-tome-322009-default-rtdb.firebaseio.com/";

class FriendAddPage extends React.Component {
  constructor() {
    super();
    this.state = {
      words: {},
      addword: "",
      searchCata: "",
    };
  }
  /*
  //1. serch - addword를 db에서 검색하는 로직 요청 res를 words에 저장
  //2 .해당 res에 대한 동작코드 - _get()에 대신 넣으면 작동
  _search(addword) {
      if(this.state.searchCata=='아이디'){//아이디,이름 검색
    return fetch(`${databaseURL}/words/id/${addword}.json`)
    }return fetch(`${databaseURL}/words/name/${addword}.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((words) => {
        if ((!res)) {//res가 null일시 alert 모달
          Alert.alert('확인', '검색 결과가 없습니다', [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ]);
        }else{//객체가 있다면 words에 저장
          this.setState({ words: words })
        }
      });
  }
  */
  //test - search()를 대신함.
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

  //친구 추가
  _post(word) {
    return fetch(`${databaseURL}/words.json`, {
      method: "POST",
      body: JSON.stringify(word),
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        let nextState = this.state.words;
        nextState[data.name] = word;
        this.setState({ words: nextState });
      });
  }

  componentDidMount() {
    this.setState({ addword: this.props.route.params.inputword });
    this.setState({ searchCata: this.props.route.params.searchCata });
    this._get();
    //this._search(addword)
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
           
        <Text>
          {this.state.addword}({this.state.searchCata})친구검색 결과
        </Text>
        <View>
          {Object.keys(this.state.words).map((id) => {
            const word = this.state.words[id];
            return (
              <View key={id}>
                <Text>
                  <Text>name : {word.name}</Text>
                  // <Text>id : {word.id}</Text>
                  <Button
                    title="추가"
                    onPress={() => {
                      const addword = {
                        name: word.name,
                      };
                      this._post(addword);
                      Alert.alert("확인", "친구 추가가 완료되었습니다.", [
                        {
                          text: "OK",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ]);
                      navigation.navigate("MainPage");
                    }}
                  ></Button>
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
export default FriendAddPage;
