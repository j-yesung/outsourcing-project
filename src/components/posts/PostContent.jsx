import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../../styles/posts/PostContent.styled';
import { getFormattedDate } from 'utils/date';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer';
import { Viewer } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/react-editor';
import { deletePosts, getUser, updatePosts } from 'api/firebase';
import { deletePost, editPost } from 'store/modules/postsSlice';

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
  const posts = useSelector((state) => state.postsSlice.posts);
  console.log(posts);
  const { id } = useParams();
  const { title, contents, createdAt, uid } = posts.find((item) => item.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);

  const editorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // editorRef.current?.getInstance().setHTML(contents);
    editorRef.current?.getInstance().setMarkdown(contents);
  }, []);
  useEffect(() => {
    // editorRef.current?.getInstance().setHTML(contents);
    editorRef.current?.getInstance().setMarkdown(contents);
  }, [isEditing]);

  // 삭제 버튼 누르면 알림창 뜨고 삭제
  const deleteHandler = async (id) => {
    const newPosts = posts.filter((target) => target.id != id);
    alert('삭제하시겠습니까?');
    // firebase삭제
    await deletePosts(id);
    // postsSlice 전역 삭제
    dispatch(deletePost(newPosts));
    navigate(`/post`);
  };
  const updateHandler = () => {
    const contentMark = editorRef?.current?.getInstance().getMarkdown();
    updatePosts(id, titleEdit, contentMark);
    dispatch(editPost(id, titleEdit, contentMark));
    setIsEditing(false);
  };
  return (
    <S.Container>
      {/* Header와 Body 통째로 삼항연산자 */}
      {isEditing ? (
        <>
          <S.PostHeader>
            <S.PostTitleEdit value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <S.PostDate>{getFormattedDate(createdAt)}</S.PostDate>
              <S.PostBtn>
                <button onClick={() => setIsEditing(false)}>취소</button>
                <button onClick={() => updateHandler()}>완료</button>
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
            />
          </S.PostContent>
        </>
      ) : (
        <>
          <S.PostHeader>
            <S.PostTitle>{title}</S.PostTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <S.PostDate>{getFormattedDate(createdAt)}</S.PostDate>
              {getUser().uid === uid && (
                <S.PostBtn>
                  <button onClick={() => setIsEditing(true)}>수정</button>
                  <button onClick={() => deleteHandler(id)}>삭제</button>
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
