import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: rgba(252, 129, 0, 1);
  &:hover {
    background: white;
    color: #fc881d;
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
