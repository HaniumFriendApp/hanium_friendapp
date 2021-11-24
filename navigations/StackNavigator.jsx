import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다

import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

import TabNavigator from './TabNavigator';

import EditPage from '../pages/EditPage';
import ServiceCenter from '../pages/ServiceCenter';
import WriteQuestion from '../pages/WriteQuestion';
import FindIdPage from '../pages/FindIdPage';
import CalendarPage from '../pages/CalendarPage';
import ChatPage from '../pages/ChatPage';
import FaceChatPage from '../pages/FaceChatPage';
import FriendAddPage from '../pages/FriendAddPage';
import MainPage from '../pages/MainPage';
//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
    //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
    //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        //헤더 숨기기
        headerShown: false,
      }}
    >
      {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="SignUpPage" component={SignUpPage} />

      <Stack.Screen name="EditPage" component={EditPage} />
      <Stack.Screen name="ServiceCenter" component={ServiceCenter} />
      <Stack.Screen name="WriteQuestion" component={WriteQuestion} />
      <Stack.Screen name="FindIdPage" component={FindIdPage} />
      <Stack.Screen name="CalendarPage" component={CalendarPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
      <Stack.Screen name="FaceChatPage" component={ChatPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="FriendAddPage" component={FriendAddPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
