import Editor from "../components/write/Editor";
import Responsive from "../components/common/Responsive";
import Header from "../components/common/Header";
import WriteActionButtons from "../components/write/WriteActionButtons";
const WritePage = () => {
  return (
    <>
      <Header />
      <Responsive>
        <Editor />
      </Responsive>
    </>
  );
};

export default WritePage;
