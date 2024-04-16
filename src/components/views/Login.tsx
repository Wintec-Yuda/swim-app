import AuthLayout from "../templates/Auth";
import LoginForm from "../fragments/form/Login";

const LoginView = () => {
  return (
    <AuthLayout title="Login" link="/auth/register" linkText="Don't have an account?">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginView;
