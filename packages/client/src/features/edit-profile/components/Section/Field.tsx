import { useFormContext } from "react-hook-form"
import { ClearTextButton } from "src/components/buttons/ButtonClearText"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"

export default function Field({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
  const { getFieldState, formState, resetField, register } = useFormContext()
  const { isDirty } = getFieldState(name, formState)
  const { handleOnFocus } = useMobileKeyboardHandler()

  return (
    <li className="edit-section__item">
      <div className={`edit-section__item--shadow-outset ${label}`}>
        <div className="edit-section__item-input-container">
          <p>{label}</p>
          <input
            {...register(name)}
            className={`edit-section__item-input`}
            placeholder={placeholder}
            type="text"
            autoComplete="off"
            onFocus={() => handleOnFocus()}
          />
        </div>

        <ClearTextButton
          isTouched={isDirty}
          onClick={() => resetField(name)}
          boxShadows={{
            outset: "1px 1px 3px #282828, -1px -1px 2px 0px #fbfbfb",
            inset: "inset 1px 1px 3px #282828, inset -1px -1px 2px 0px #ffffff",
          }}
          height={"80%"}
          position={[30, 20]}
        />
      </div>
    </li>
  )
}
