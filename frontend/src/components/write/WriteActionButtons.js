import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  padding-left: 5rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  margin-left: 0.5rem;
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsBlock>
      <Link to="/">
        <StyledButton onClick={onPublish}>포스팅</StyledButton>
      </Link>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
