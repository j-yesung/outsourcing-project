import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import * as S from '../../src/styles/pages/Write.styled';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { usePosts } from 'hooks/usePosts';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { storage, auth } from 'api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const colorSyntaxOptions = {
  preset: [
    '#333333',
    '#666666',
    '#FFFFFF',
    '#EE2323',
    '#F89009',
    '#009A87',
    '#006DD7',
    '#8A3DB6',
    '#781B33',
    '#5733B1',
    '#953B34',
    '#FFC1C8',
    '#FFC9AF',
    '#9FEEC3',
    '#99CEFA',
    '#C1BEF9'
  ]
};

const Write = () => {
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const editorRef = useRef();
  const titleRef = useRef();
  const inputRef = useRef({});
  const { __addPosts } = usePosts();

  const [input, setInput] = useState('');

  const onClickHandler = async () => {
    try {
      const contentMark = editorRef?.current?.getInstance().getMarkdown();
      const photoUrl = await handleThumbnailUpload();
      if (contentMark === '' || titleRef.current.value === '') return alert('제목과 내용을 입력하세요');
      const newPost = {
        title: titleRef.current.value,
        contents: contentMark,
        createdAt: Date.now(),
        uid: userInfo.uid,
        likeCount: 0,
        likedBy: [],
        imgurl: photoUrl || ''
      };
      __addPosts(newPost);
    } catch (error) {
      console.log('error -> ', error);
    }
  };

  const handleThumbnailUpload = async () => {
    const imgFile = inputRef.current.img.files[0];
    try {
      console.log(imgFile);
      if (!imgFile) return;
      const imgRef = ref(storage, `posts/${auth.currentUser.uid}/${imgFile.name}`);
      await uploadBytes(imgRef, imgFile);
      const downloadUrl = await getDownloadURL(imgRef);
      return downloadUrl;
    } catch (error) {
      console.log('error -> ', error);
    }
  };

  return (
    <S.Container>
      <Box sx={{ m: 2 }} style={{ width: '800px', margin: '0 auto' }}>
        {/* <h1>글 작성 페이지</h1>
        <label htmlFor="name" className="text-sm leading-7 text-gray-600">
          제목 <span className="ml-2 text-xs text-red-500"></span>
        </label> */}
        <S.PostInput
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력하세요"
          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
          ref={titleRef}
        />
        <Editor
          height="600px"
          placeholder="내용을 입력해주세요"
          previewStyle="tab"
          initialEditType="markdown"
          hideModeSwitch={true}
          toolbarItems={[
            // 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock']
          ]}
          language="ko-KR"
          plugins={[[colorSyntax, colorSyntaxOptions]]}
          usageStatistics={false}
          ref={editorRef}
        />{' '}
        <div style={{ marginTop: '15px' }}>
          <S.PostThumbnailInput value={input} placeholder="첨부파일" onChange={() => {}} />
          <S.PostThumbnailLabel htmlFor="file">썸네일 등록</S.PostThumbnailLabel>
          <S.PostThumbnailChkInput
            type="file"
            id="file"
            onChange={(e) => setInput(e.currentTarget.files[0].name)}
            ref={(props) => (inputRef.current['img'] = props)}
          />
        </div>
      </Box>

      <S.button onClick={onClickHandler}>글 등록</S.button>
    </S.Container>
  );
};

export default Write;
