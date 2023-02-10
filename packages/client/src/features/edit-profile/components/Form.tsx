import { useLayoutEffect, useRef, useState } from "react"
import { FormProvider } from "react-hook-form"
import useEditForm from "../hooks/useEditForm"
import Header, { BackButton } from "./Header/Header"
import Field from "./Section/Field"
import Section from "./Section/Section"
import SongField from "./Section/SongField"
import UploadProfilePhoto from "./Section/UploadProfilePhoto/UploadProfilePhoto"

enum ProfileSections {
  Public = "Public",
  Personal = "Personal",
  Social = "Social",
  Songs = "Songs",
}

const SaveAndClearButtons = ({ onReset }: { onReset: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current) return
    const height = wrapperRef.current.offsetHeight
    wrapperRef.current.style.width = `${height}px`
  }, [wrapperRef.current])

  return (
    <div className="edit-profile__btns">
      <div className="edit-profile__btns--bs-outset">
        <div className="edit-profile__btns--bs-inset">
          <div className="edit-profile__btns--container">
            <div className="edit-profile__btn--container Clear" ref={wrapperRef}>
              <button className="edit-profile__btn" onClick={onReset}>
                clear
              </button>
            </div>

            <div className="edit-profile__btn--container Submit">
              <button className="edit-profile__btn" type="submit" form="edit-user-form">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Form() {
  const { onSubmitHandler, onResetHandler, songs, methods } = useEditForm()
  const [isExpanded, setIsExpanded] = useState<string>(ProfileSections.Public)

  return (
    <FormProvider {...methods}>
      <form id="edit-user-form" className="edit-profile__form" onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div className="edit-profile__body--bs-outset">
          <div className="edit-profile__body--bs-inset-2">
            <Header>
              <BackButton isDirty={methods.formState.isDirty} />
            </Header>

            <div className="edit-section__sections">
              <Section
                title={"Public"}
                isExpanded={isExpanded}
                onExpand={setIsExpanded}
                uploadPhoto={<UploadProfilePhoto />}
              >
                <Field name={"username"} label={"Username"} placeholder={"Add a username to your profile.."} />
                <Field name={"about"} label={"About"} placeholder={"Tell me about yourself.."} />
                <Field name={"location"} label={"Location"} placeholder={"Where u from G?"} />
              </Section>
              <Section title={"Personal"} isExpanded={isExpanded} onExpand={setIsExpanded}>
                <Field name={"email"} label={"Email"} placeholder={"What's your email?"} />
                <Field name={"firstName"} label={"First Name"} placeholder={"What is your first name?"} />
                <Field name={"lastName"} label={"Last Name"} placeholder={"What is your last name?"} />
              </Section>
              <Section title={"Social"} isExpanded={isExpanded} onExpand={setIsExpanded}>
                <Field name={"instagram"} label={"Instagram"} placeholder={"Your Insta handle?"} />
                <Field name={"twitter"} label={"Twitter"} placeholder={"What you Tweetin'?."} />
                <Field name={"soundCloud"} label={"SoundCloud"} placeholder={"Your SoundCloud handle?"} />
              </Section>
              <Section title={"Songs"} isExpanded={isExpanded} onExpand={setIsExpanded}>
                {songs?.map((song, index) => {
                  return <SongField key={`${index}_${song._id}`} inputData={song} index={index} />
                })}
              </Section>
            </div>
          </div>
        </div>
        <SaveAndClearButtons onReset={() => onResetHandler()} />
      </form>
    </FormProvider>
  )
}
