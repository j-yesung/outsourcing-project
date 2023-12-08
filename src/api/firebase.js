import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  doc,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  getFirestore,
  query,
  orderBy
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import userIcon from '../assets/user.svg';

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
const storage = getStorage(app);
const fnbRef = collection(db, 'fnb');
const postsRef = collection(db, 'posts');
const commentsRef = collection(db, 'comments');

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
    const userInfo = {
      accessToken: userCredential.user.accessToken,
      nickname: userCredential.user.displayName,
      email: userCredential.user.email,
      image: userCredential.user.photoURL,
      uid: userCredential.uid
    };
    return userInfo;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

/**
 * @returns 현재 유저 정보 가져오기
 */
export const getUser = () => auth.currentUser;

/**
 * @returns 로그아웃
 */
export const logoutUser = () => auth.signOut();

/**
 * fnb 읽어오기
 * @returns 파이어스토어에 있는 데이터들
 */
export const getMapList = async () => {
  try {
    const querySnapshot = await getDocs(fnbRef);
    const mapList = [];
    querySnapshot.forEach((doc) => {
      mapList.push(doc.data());
    });
    localStorage.setItem('ALL_DATA', JSON.stringify(mapList));
    return mapList;
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

export const getSpecificMapList = async (name) => {
  try {
    const querySnapshot = await getDocs(fnbRef);
    const specificValue = name; // TODO: 동적으로 변경 (변수 지정 -> 카테고리를 클릭했을 때에 value)
    const documentsWithSpecificValue = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // 특정 필드 값과 일치하는 문서
      if (data['category_group_name'] === specificValue) documentsWithSpecificValue.push({ id: doc.id, data: data });
    });

    return documentsWithSpecificValue;
  } catch (error) {
    console.error('공습 경보 😵', error);
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

/**
 * 댓글 조회
 * @returns
 */
export const getComments = async () => {
  try {
    const querySnapshot = await getDocs(commentsRef);
    const allComments = [];

    querySnapshot.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.data().id, uid: doc.id });
    });
    return allComments;
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

/**
 * 댓글 작성
 * @param {*} data 작성 댓글
 * @param {*} docId fnb 문서 ID
 */
export const addComment = async (data) => {
  try {
    await addDoc(commentsRef, data);
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

/**
 * 댓글 수정
 * @param {*} id
 * @param {*} updateData
 */
export const updateComment = async ({ id, updateData }) => {
  console.log('id, updateData: ', id, updateData);
  try {
    const docRef = doc(db, 'comments', id);
    await updateDoc(docRef, updateData);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 댓글 삭제
 * @param {} id
 */
export const deleteComment = async (id) => {
  try {
    await deleteDoc(doc(db, 'comments', id));
  } catch (e) {
    console.error(e);
  }
};

/**
 * posts 추가하기
 * write에서 가져온 데이터를 Firebase에 추가하기
 * @param {*} data
 */
export const addPosts = async (data) => {
  try {
    await addDoc(postsRef, data);
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

/**
 * @returns posts 읽어오기
 */
export const getPosts = async () => {
  try {
    // 날짜순으로 정렬하여 불러오기(내림차순)
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const postsList = [];
    querySnapshot.forEach((doc) => {
      // id 추가하여 가져오기
      postsList.push({ ...doc.data(), id: doc.id });
    });
    return postsList;
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

// posts 삭제하기
export const deletePosts = async (id) => {
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.error('공습 경보 😵', error);
    throw error;
  }
};

/**
 * 파일 업로드
 * @param {*} file 업로드한 파일 참조 값
 * @returns Storage에 저장된 파일 URL
 */
export const fileUpload = async (userInfo, file) => {
  const imageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  // 유저 정보 업데이트
  updateProfile(userInfo, { image: downloadURL });
  return downloadURL;
};
