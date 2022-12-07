import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import LoginForm from "../containers/auth/LoginForm";
import Header from "../components/common/Header";

const LoginPage = () => {
  return (
    <>
      <Header />
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
