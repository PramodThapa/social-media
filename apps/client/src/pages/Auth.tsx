import { Link, useLocation, useNavigate } from "react-router-dom";

import "~/styles/_auth.scss";
import { AuthMode } from "~/types";
import {
  LoginForm,
  LoginInFormValue,
  SignUpForm,
  SignUpFormValue,
} from "~/component/authentication";
import { useUserLogin, useUserSignup } from "~/hooks/user/userUser";
import { handleError } from "~/utils";

import { ROUTE } from "~/constant/route";
import { addUserToLocalStorage } from "~/services";
import { AxiosError } from "axios";
import { AUTH } from "~/constant";

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const mode: AuthMode = (params.get("mode") as AuthMode) || AuthMode.SIGNUP;
  const { mutateAsync: handleUserSignup, error: signupError } = useUserSignup();
  const { mutateAsync: handleUserLogin, error: loginError } = useUserLogin();

  /**
   * Function to handle login form submit.
   *
   * @param {LoginInitialValue} value Form values.
   */
  const onUserLogin = async (value: LoginInFormValue) => {
    try {
      const { data: response } = await handleUserLogin(value);

      const { token, user } = response.data;

      addUserToLocalStorage(token, user);
      navigate(ROUTE.HOME);
    } catch (error) {
      handleError(loginError as AxiosError);
    }
  };

  /**
   * Function to handle sign up form submit.
   *
   * @param {SignUpInitialValues} value Sign up form values.
   */
  const onUserSignUp = async (value: SignUpFormValue) => {
    try {
      const { data: response } = await handleUserSignup(value);
      const { token, user } = response.data;

      addUserToLocalStorage(token, user);

      navigate(ROUTE.HOME);
    } catch (err) {
      handleError(signupError as AxiosError);
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        {mode === AuthMode.LOGIN ? (
          <>
            <LoginForm
              onFormSubmit={onUserLogin}
              initialValue={{ email: "", password: "" }}
            />
            <div className="form-alternative">
              {AUTH.WITHOUT_ACCOUNT}
              <Link to={`${ROUTE.AUTH}/?mode=signup`}>Signup</Link>
            </div>
          </>
        ) : (
          <>
            <SignUpForm onSignUp={onUserSignUp} />
            <div className="alternative">
              {AUTH.WITH_ACCOUNT}
              <Link to={`${ROUTE.AUTH}/?mode=login`}>Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
