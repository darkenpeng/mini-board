import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterForm from "../containers/auth/RegisterForm";
import Header from "../components/common/Header";
const RegisterPage = () => {
  return (
    <>
      <Header />
      <AuthTemplate>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
