import { useLocation } from "react-router-dom";

import "~/sass/_auth.scss";
import { AuthMode } from "~/types";
import { LoginForm, SignUpForm } from "~/component/authentication";

export function Auth() {
  // const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const mode: AuthMode = (params.get("mode") as AuthMode) || AuthMode.SIGNUP;

  /**
   * Function to handle login form submit.
   *
   * @param {LoginInitialValue} value Form values.
   * @param {Function} setSubmitting Function to handle set submitting.
   */
  // const handleUserLogin = async (
  //   value: LoginInFormValue,
  //   setSubmitting: () => void
  // ) => {
  //   try {
  //     setSubmitting(true);

  //     const { data: response } = await userLogin(value);

  //     const { token, user } = response?.data;

  //     addUserLoginToLocalStorage(token, user);
  //     dispatch(setUser(user));

  //     navigate("/");
  //   } catch (error: Error | AxiosError | any) {
  //     handleError(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  /**
   * Function to handle sign up form submit.
   *
   * @param {SignUpInitialValues} value Sign up form values.
   * @param {Function} setSubmitting Function to handle set submitting.
   */
  // const handleUserSignUp = async (
  //   value: SignUpFormValue,
  //   setSubmitting: Function
  // ) => {
  //   const { username, password } = value;
  //   try {
  //     setSubmitting(true);

  //     const { data: response } = await userSignUp({ username, password });

  //     const { token, user } = response?.data;

  //     addUserLoginToLocalStorage(token, user);
  //     navigate("/");
  //   } catch (error: Error | AxiosError | any) {
  //     handleError(error[0]);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <div className="login">
      <div className="login__form">
        {mode === AuthMode.LOGIN ? (
          <LoginForm
            onFormSubmit={() => {}}
            initialValue={{ username: "", password: "" }}
          />
        ) : (
          <SignUpForm handleSignUp={() => {}} />
        )}
      </div>
    </div>
  );
}
