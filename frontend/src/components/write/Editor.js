import { useRef, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import WriteActionButtons from "./WriteActionButtons";
const EditorBlock = styled(Responsive)`
  margin-top: 5rem;
  padding-top: 5rem;
  padding-bottom: 1rem;
  width: 1200px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
  }, []);

  return (
    <EditorBlock>
      <TitleInput placeholder="제목을 입력하세요" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <WriteActionButtons />
    </EditorBlock>
  );
};

export default Editor;
