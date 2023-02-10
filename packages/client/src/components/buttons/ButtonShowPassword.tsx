import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { eyeIcon, noEyeIcon } from '../../assets/images/_icons'

type Props = {
  setType: Dispatch<SetStateAction<string>>
  password: string
}

export default function ButtonShowPassword({ setType, password }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(false)

  useEffect(() => {
    if (password) {
      setShowButton(true)
      setShowPassword(false)
    } else {
      setShowButton(false)
      setType('password')
    }
  }, [password])

  const showPasswordHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string,
    isShowing: boolean,
  ) => {
    e.preventDefault()
    setType(type)
    setShowPassword(isShowing)
  }

  return (
    <div className="ButtonShowPassword" style={showButton ? { opacity: '1' } : { opacity: '0' }}>
      {showPassword ? (
        <button
          className="show-password-btn"
          onMouseDown={e => e.preventDefault()}
          onClick={e => showPasswordHandler(e, 'password', false)}
          tabIndex={-1}
        >
          <img className="button-icons password-no-eye" src={noEyeIcon} alt="hide password" />
        </button>
      ) : (
        <button
          className="show-password-btn"
          onMouseDown={e => e.preventDefault()}
          onClick={e => showPasswordHandler(e, 'text', true)}
          tabIndex={-1}
        >
          <img className="button-icons password-eye" src={eyeIcon} alt="show password" />
        </button>
      )}
    </div>
  )
}
