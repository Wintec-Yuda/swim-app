import AuthLayout from "../templates/Auth";
import RegisterForm from "../fragments/form/Register";

const RegisterView = () => {
  return (
    <AuthLayout title="Register" link="/auth/login" linkText="Already have an account?">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterView;
