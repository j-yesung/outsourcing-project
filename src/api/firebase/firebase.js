import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import userIcon from '../../assets/user.svg';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collectionRef = collection(db, 'fnb');

/**
 * 회원가입
 * @param {*} email
 * @param {*} password
 * @param {*} nickname
 * @returns
 */
export const registerUser = async (email, password, nickname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: nickname, photoURL: userIcon });
    return userCredential.user;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};
/**
 * 로그인
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

/**
 * fnb 읽어오기
 * @returns 파이어스토어에 있는 데이터들
 */
export const getMapList = async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const mapList = [];
    querySnapshot.forEach((doc) => {
      mapList.push(doc.data());
    });
    return mapList;
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

export const getSpecificMapList = async (name) => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const specificValue = name; // TODO: 동적으로 변경 (변수 지정 -> 카테고리를 클릭했을 때에 value)
    const documentsWithSpecificValue = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // 특정 필드 값과 일치하는 문서
      if (data['category_group_name'] === specificValue) documentsWithSpecificValue.push({ id: doc.id, data: data });
    });

    return documentsWithSpecificValue;
  } catch (error) {
    console.error('에러 😵', error);
  }
};

/**
 * fnb 추가 하기
 * getItem에서 가져온 데이터를 Firestore에 추가
 * @param {*} data 15개의 장소 (장소는 검색 키워드를 통해 나온 곳들)
 * @param {*} DocId 직접 지정한 문서 ID
 */
export const addToMapListDatabase = async (data, docId) => {
  try {
    const docRef = doc(db, 'fnb', docId);
    await setDoc(docRef, data);
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};
