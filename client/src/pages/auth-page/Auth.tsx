import { Dispatch, SetStateAction, useState } from "react"
import flowLogo from "../../assets/images/FlowLogo.png"
import AuthFormProvider from "./AuthForm"

export type AccessTitleType = "Log In" | "Sign Up"

const AccessTitle = ({ accessTitle }: { accessTitle: AccessTitleType }) => (
  <div className="user-login-1_title">
    <div className="title_shadow-div-inset">{accessTitle === "Sign Up" ? `Sign Up` : `Log In`}</div>
  </div>
)

const Access = ({
  accessTitle,
  setAccessTitle,
}: {
  accessTitle: AccessTitleType
  setAccessTitle: Dispatch<SetStateAction<AccessTitleType>>
}) => (
  <div className="switch--container">
    <div className="switch--shadow-outset">
      <div className="switch--shadow-inset">
        <div className="switch__text--container">
          <p className="switch__text">
            {accessTitle === "Sign Up" ? "Already a member of Flow?" : "Don't have an account?"}
          </p>
        </div>

        <div className="switch__btn--container">
          <button
            className="switch__btn"
            onClick={() => setAccessTitle((prev) => (prev === "Log In" ? "Sign Up" : "Log In"))}
          >
            {accessTitle === "Sign Up" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  </div>
)

const OAuthLogins = () => {
  return (
    <div className="user-login-2_other-logins">
      <div className="other-logins-1_google-btn">
        <div className="google-btn_shadow-div-outset">
          <p>Continue with </p>
          {/* <GoogleLogin
              clientId={clientId}
              buttonText={isLogIn ? "Sign Up" : "Log In"}
              onSuccess={onResponse}
              onFailure={onResponse}
              cookiePolicy={"single_host_origin"}
            /> */}
        </div>
      </div>
      <div className="other-logins-2_or-container">
        <div className="border"></div>
        <p>or</p>
        <div className="border"></div>
      </div>
    </div>
  )
}

export default function Auth() {
  const [accessTitle, setAccessTitle] = useState<AccessTitleType>("Log In")

  return (
    <div className="Auth">
      <div className="page-container">
        <div className="upper-container">
          <div className="upper-outset">
            <div className="upper-inset">
              <div className="upper-inset-outset">
                <p>Welcome To</p>
              </div>
            </div>
          </div>
        </div>

        <div className="middle-container">
          <div className="mid-outset">
            <div className="mid-inset">
              <div className="login-container">
                <div className="title-container">
                  <img src={flowLogo} alt="flow logo" />
                </div>

                <div className="user-input-container">
                  <div className="user-login_shadow-div-outset">
                    <AccessTitle accessTitle={accessTitle} />

                    <OAuthLogins />

                    <AuthFormProvider accessTitle={accessTitle} />
                  </div>
                </div>
              </div>
            </div>
            <Access accessTitle={accessTitle} setAccessTitle={setAccessTitle} />
          </div>
        </div>
      </div>
    </div>
  )
}
