import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert, AsyncStorage } from 'react-native';

export async function registration(nickName, email, password, navigation) {
  try {
    console.log(nickName, email, password, navigation);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    Alert.alert('회원가입 성공!', '로그인 페이지로 넘어갑니다');
    await AsyncStorage.setItem('session', email);
    await AsyncStorage.setItem('user', currentUser.uid);
    navigation.push('TabNavigator');
  } catch (err) {
    Alert.alert('무슨 문제가 있는 것 같아요! => ', err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem('session', email);
    await AsyncStorage.setItem('user', currentUser.uid);
    navigation.push('TabNavigator');
  } catch (err) {
    Alert.alert('로그인에 문제가 있습니다! ', err.message);
  }
}

export async function logout(navigation) {
  try {
    console.log('로그아웃!!');
    const currentUser = firebase.auth().currentUser;
    await AsyncStorage.removeItem('session');
    await AsyncStorage.removeItem('user');
    await firebase.auth().signOut();
    navigation.push('SignInPage');
  } catch (err) {
    Alert.alert('로그 아웃에 문제가 있습니다! ', err.message);
  }
}

export async function DeleteUser(navigation, content) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = firebase.firestore();
    await db
      .collection('signOutDetail')
      .doc(content.date + 'D')
      .set(content);
    console.log('탈퇴1');
    await AsyncStorage.removeItem('session');
    console.log('탈퇴2!');
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
    await currentUser.delete();
    console.log('탈퇴3');
    await db.collection('users').doc(currentUser.uid).delete();
    console.log('탈퇴4');

    Alert.alert('회원탈퇴 성공!! 로그인 페이지로 돌아갑니다...');
    navigation.push('SignInPage');
  } catch (err) {
    Alert.alert('회원탈퇴에 문제가 있습니다! ', err.message);
  }
}

export async function getUser(setUser) {
  try {
    console.log('현재 사용자 정보 가져옴!');
    const currentUser = firebase.auth().currentUser;
    console.log('1');
    const user = await currentUser.email;
    console.log('2');
    setUser(user);
    console.log('3');
    return user;
  } catch (err) {
    Alert.alert('현재 사용자 정보를 가져오는데 문제가 있습니다! ', err.message);
  }
}

export async function addDiary(content) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection('users').doc(content.uid);

    let data = await userRef.get().then((doc) => {
      return doc.data();
    });
    console.log(data.nickName);
    content.author = data.nickName;
    await db
      .collection('diary')
      .doc(content.date + 'D')
      .set(content);
    return true;
  } catch (err) {
    Alert.alert('글 작성에 문제가 있습니다! ', err.message);
    return false;
  }
}

export async function imageUpload(blob, date) {
  const storageRef = firebase
    .storage()
    .ref()
    .child('diary/' + date);
  const snapshot = await storageRef.put(blob);
  const imageUrl = await snapshot.ref.getDownloadURL();
  blob.close();

  return imageUrl;
}

export async function getData(setNext, setData) {
  try {
    let data = [];
    const db = firebase.firestore();
    const first = db.collection('diary').orderBy('date', 'desc').limit(5);

    const snapshot = await first.get();
    const currentUser = firebase.auth().currentUser;
    // snapshot.docs.map((doc) => {
    //   console.log("[페이지네이션 01]")
    //   data.push(doc.data());
    // });
    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
    }
    setNext(last.data().date);
    let count = 0;
    let limit = snapshot.docs.length;

    snapshot.docs.map(async (doc) => {
      console.log('[페이지네이션 01]');
      let d = doc.data();
      const like = await db
        .collection('diary')
        .doc(d.date + 'D')
        .collection('likes')
        .doc(currentUser.uid)
        .get();

      if (like.data() == undefined) {
        d.like = false;
      } else {
        d.like = true;
      }

      //count 갯수가 불러온 게시글 갯수만큼 늘어났다면
      //게시글 상태를 관리할 타이밍!
      count += 1;
      data.push(d);
      if (count == limit) {
        setData(data);
      }
    });
    // return data
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getNextData(nextDate, setNext) {
  try {
    console.log('불러올 다음 date: ' + nextDate);
    let data = [];
    const db = firebase.firestore();
    const next = db
      .collection('diary')
      .orderBy('date', 'desc')
      .startAfter(nextDate)
      .limit(5);
    const snapshot = await next.get();
    snapshot.docs.map((doc) => {
      console.log('[페이지네이션 Next]');
      doc.data();
      data.push(doc.data());
    });

    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
      setNext(last.data().date);
      return data;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addComment(comment) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection('users').doc(comment.uid);

    let data = await userRef.get().then((doc) => {
      return doc.data();
    });
    console.log(data.nickName);
    comment.author = data.nickName;
    await db
      .collection('comment')
      .doc(comment.date + 'D')
      .set(comment);
    return true;
  } catch (err) {
    Alert.alert('댓글 작성에 문제가 있습니다! ', err.message);
    return false;
  }
}

export async function getComment(did) {
  const db = firebase.firestore();
  let data = [];
  let snapshot = await db.collection('comment').where('did', '==', did).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return 0;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      data.push(doc.data());
    });

    return data;
  }
}

export async function doLike(uid, did, like) {
  console.log(uid, did);
  try {
    const db = firebase.firestore();
    const date = new Date();
    const getTime = date.getTime();
    console.log(did);
    //좋아요 -> 해제
    if (like == true) {
      await db
        .collection('diary')
        .doc(did)
        .collection('likes')
        .doc(uid)
        .delete(); //삭제
    } else {
      //해제 -> 좋아요
      await db.collection('diary').doc(did).collection('likes').doc(uid).set({
        date: getTime,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
