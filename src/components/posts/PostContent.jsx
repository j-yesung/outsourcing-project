import { usePosts } from 'hooks/usePosts';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFormattedDate } from 'utils/date';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import * as S from '../../styles/posts/PostContent.styled';
import * as M from '../../styles/modal/Lodaing.styled';
import React, { useEffect, useRef, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useLikes } from 'hooks/useLikes';
import likeHeart from '../../assets/pngwing.com.png';

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

// 특정 게시글 보여주기
const PostDetail = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const editTitleRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const { likes, increaseLike } = useLikes(id);
  console.log('likes: ', likes);
  const { posts, postsLoading, __updatePosts, __deletePosts } = usePosts();
  const { title, contents, createdAt, uid } = posts ? posts.find((item) => item.id === id) : [];
  const userInfo = useSelector((state) => state.authSlice.userInfo);

  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(contents);
  }, [isEditing, contents]);

  const deleteHandler = (id) => {
    if (window.confirm('삭제 하시겠습니까?')) {
      __deletePosts(id);
      alert('삭제되었습니다.');
    }
  };

  const updateHandler = () => {
    const contentMark = editorRef?.current?.getInstance().getMarkdown();
    const updates = { title: editTitleRef.current.value, contents: contentMark };
    __updatePosts({ id, updates });
    setIsEditing(false);
  };

  if (postsLoading) {
    return <M.Loader />;
  }

  return (
    <S.Container>
      {isEditing ? (
        <>
          <S.PostHeader>
            <S.PostTitleEdit ref={editTitleRef} defaultValue={title} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <S.PostDate>{getFormattedDate(createdAt)}</S.PostDate>
              <S.PostBtn>
                <button onClick={() => setIsEditing(false)}>취소</button>
                <button onClick={updateHandler}>완료</button>
              </S.PostBtn>
            </div>
          </S.PostHeader>
          <S.PostContent>
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
              defaultValue={contents}
            />
          </S.PostContent>
        </>
      ) : (
        <>
          <S.PostHeader>
            <S.PostTitle>{title}</S.PostTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <S.PostDate>{getFormattedDate(createdAt)}</S.PostDate>
              {userInfo.uid === uid && (
                <S.PostBtn>
                  <button onClick={() => increaseLike({ postId: id, uid })}>
                    <img src={likeHeart} width={30} alt="사진" />
                  </button>
                  <button onClick={() => setIsEditing(true)}>수정</button>
                  <button onClick={() => deleteHandler(id)}>삭제</button>
                  <span>{likes}</span>
                </S.PostBtn>
              )}
            </div>
          </S.PostHeader>
          <S.PostContent>
            <Viewer initialValue={contents} />
          </S.PostContent>
        </>
      )}
    </S.Container>
  );
};

export default PostDetail;
