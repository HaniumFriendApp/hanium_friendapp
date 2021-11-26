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
  Switch,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AlarmPage({ navigation }) {
  const [friendAlarm, setFriendAlarm] = useState(true);
  const [charAlarm, setChatAlarm] = useState(true);
  const [eventAlarm, setEventAlarm] = useState(true);

  useEffect(() => {}, []);

  return (
    <Container style={styles.container}>
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
          <Text style={styles.title}>| 알림 설정 |</Text>
        </Body>
        <Right />
      </Header>

      <Content style={styles.content}>
        <Grid style={styles.wrapper}>
          <Col style={styles.textWrapper}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: '700',
                alignSelf: 'flex-start',
              }}
            >
              친구요청
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'grey',
                alignSelf: 'flex-start',
                marginTop: 12,
                borderTopColor: 'grey',
                borderTopWidth: 1.5,
                paddingTop: 15,
              }}
            >
              다른 유저가 나를 친구로 추가할 수 있습니다
            </Text>
          </Col>
          <Col style={styles.switchWrapper}>
            <Switch value={true} size="lg" colorScheme="emerald" />
          </Col>
        </Grid>
        <Grid style={styles.wrapper}>
          <Col style={styles.textWrapper}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: '700',
                alignSelf: 'flex-start',
              }}
            >
              대화방 메세지
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'grey',
                alignSelf: 'flex-start',
                marginTop: 12,
                borderTopColor: 'grey',
                borderTopWidth: 1.5,
                paddingTop: 15,
              }}
            >
              대화방 메세지를 알림으로 받습니다
            </Text>
          </Col>
          <Col style={styles.switchWrapper}>
            <Switch value={true} size="lg" colorScheme="emerald" />
          </Col>
        </Grid>
        <Grid style={styles.wrapper}>
          <Col style={styles.textWrapper}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: '700',
                alignSelf: 'flex-start',
              }}
            >
              이벤트
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'grey',
                alignSelf: 'flex-start',
                marginTop: 12,
                borderTopColor: 'grey',
                borderTopWidth: 1.5,
                paddingTop: 15,
              }}
            >
              이벤트 관련 메세지를 알림으로 받습니다.
            </Text>
          </Col>
          <Col style={styles.switchWrapper}>
            <Switch value={true} size="lg" colorScheme="emerald" />
          </Col>
        </Grid>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#401201',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  wrapper: { height: 200, marginBottom: 5, marginTop: 5, padding: 5 },
  textWrapper: {
    width: '80%',
  },
  switchWrapper: {
    width: '20%',
  },
});
