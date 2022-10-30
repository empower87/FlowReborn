import { LayoutThree } from "src/components/layouts/LayoutWrappers"
import { IUser } from "../../../../../../server/src/models/User"

type FieldProps = {
  title: string
  value: string | undefined
}

const Field = ({ title, value }: FieldProps) => (
  <div className={`fields__field ${title}`}>
    <div className="p-1">
      <p>{title}: </p>
    </div>
    <div className="p-2">
      <p>{value}</p>
    </div>
  </div>
)

export default function Fields({ user }: { user: IUser }) {
  const first = user.firstName ? user.firstName : ""
  const last = user.lastName ? user.lastName : ""

  return (
    <LayoutThree classes={["user-data-1_fields-container", "fields_shadow-div-inset", "fields_shadow-div-outset"]}>
      <Field title="Name" value={`${first} ${last}`} />
      <Field title="Email" value={user.email} />
      <Field title="Town" value={user.location} />
      <Field title="Bio" value={user.about} />
      <Field title="Twtr" value={user.socials?.twitter} />
      <Field title="Insta" value={user.socials?.instagram} />
      <Field title="SoundCloud" value={user.socials?.soundCloud} />
    </LayoutThree>
  )
}
