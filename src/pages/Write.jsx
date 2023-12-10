import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { usePosts } from 'hooks/usePosts';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef } from 'react';
import Box from '@mui/material/Box';

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
  const { __addPosts } = usePosts();

  const onClickHandler = async () => {
    try {
      const contentMark = editorRef?.current?.getInstance().getMarkdown();
      if (contentMark === '' || titleRef.current.value === '') return alert('제목과 내용을 입력하세요');
      const newPost = {
        title: titleRef.current.value,
        contents: contentMark,
        createdAt: Date.now(),
        uid: userInfo.uid,
        isEdit: false
      };
      __addPosts(newPost);
    } catch (error) {
      console.log('error -> ', error);
    }
  };
  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>글 작성 페이지</h1>
        <label htmlFor="name" className="text-sm leading-7 text-gray-600">
          제목 <span className="ml-2 text-xs text-red-500"></span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요"
          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
          ref={titleRef}
        />
        <Editor
          height="500px"
          placeholder="내용을 입력해주세요!"
          previewStyle="tab"
          initialEditType="wysiwyg"
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
        />
        <button onClick={onClickHandler}>Click</button>
      </Box>
    </div>
  );
};

export default Write;
