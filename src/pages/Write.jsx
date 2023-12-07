import React from "react";
import Box from "@mui/material/Box";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/i18n/ko-kr';
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
const colorSyntaxOptions = {
  preset: [
    "#333333", "#666666", "#FFFFFF", "#EE2323", "#F89009", "#009A87", "#006DD7", "#8A3DB6",
    "#781B33", "#5733B1", "#953B34", "#FFC1C8", "#FFC9AF", "#9FEEC3", "#99CEFA", "#C1BEF9",
  ],
};

const Write = () => {
  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>글 작성 페이지</h1>
        <Editor
          height="500px"
          placeholder="내용을 입력해주세요!"
          previewStyle="tab" 
          initialEditType="wysiwyg" 
          hideModeSwitch={true}
          toolbarItems={[ // 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table",  "image",  "link"],
            ["code", "codeblock"],
          ]}
          language="ko-KR"
          plugins={[[colorSyntax, colorSyntaxOptions]]}
          usageStatistics={false} 
        />
      </Box>
    </div>
  );
};

export default Write;