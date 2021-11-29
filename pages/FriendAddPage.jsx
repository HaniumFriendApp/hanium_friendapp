import * as React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/AntDesign';

const databaseURL = 'https://friendadd-72871-default-rtdb.firebaseio.com/';
const userimage = {
  uri: 'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913__340.jpg',
};
class FriendAddPage extends React.Component {
  constructor() {
    super();
    this.state = {
      words: {},
      addword: '',
      searchCata: '',
      showingbool: true,
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
      method: 'POST',
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
      <View style={{ paddingBottom: 50 }}>
        <View
          style={{
            paddingTop: Constants.statusBarHeight,
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
              <View style={styles.iconposition}>
                <TouchableOpacity>
                  <Icon name="bells" size={30} color="#black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          {this.state.addword}({this.state.searchCata})친구검색 결과
        </Text>
        <ScrollView>
          <View style={styles.underlinestyle} />

          <View>
            {Object.keys(this.state.words).map((id) => {
              const word = this.state.words[id];
              return (
                <View key={id}>
                  <View style={styles.row}>
                    <Image
                      style={[styles.imagestyle, { borderWidth: 2 }]}
                      source={userimage}
                    />
                    <View>
                      <Text style={{ fontSize: 15 }}> {word.name}</Text>
                      <Text>id:</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        alignItems: 'flex-end',
                        flex: 1,
                        marginRight: 30,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        const addword = {
                          name: word.name,
                        };
                        this._post(addword);
                        Alert.alert('확인', '친구 추가가 완료되었습니다.', [
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ]);
                        this.props.navigation.navigate('TabNavigator');
                      }}
                    >
                      <Icon name="pluscircleo" size={30} color="#black" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.underlinestyle} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
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

  underlinestyle: {
    borderBottomColor: '#CED4BE',
    borderBottomWidth: 1,
    margin: 2,
  },
});
export default FriendAddPage;
