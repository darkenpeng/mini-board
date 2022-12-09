import Editor from "../components/write/Editor";
import Responsive from "../components/common/Responsive";
import Header from "../components/common/Header";
import WriteActionButtons from "../components/write/WriteActionButtons";
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";
const WritePage = () => {
  return (
    <>
      <Header />
      <Responsive>
        <EditorContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
};

export default WritePage;
