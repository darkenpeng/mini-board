import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton onClick={onPublish}>포스팅</StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
