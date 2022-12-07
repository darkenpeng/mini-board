import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4rem;
  padding-right: 4rem;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            HELLO
          </Link>
          <div className="right">
            <Button to="/login">로그인</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
