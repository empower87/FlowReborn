import { ReactNode } from "react"

type LyricsBoxLayoutProps = {
  buttonType: "Expand" | "Close"
  isMe: boolean
  children: ReactNode
}

type SongItemBodyLayoutProps = {
  header: JSX.Element
  lyrics: JSX.Element
}

export const SongItemBodyLayout = ({ header, lyrics }: SongItemBodyLayoutProps) => {
  return (
    <div className="profile-songs__body">
      {header}
      {lyrics}
    </div>
  )
}

export const HeaderLayout = ({ children }: { children: ReactNode }) => (
  <div className="profile-songs__header">
    <div className="profile-songs__header--shadow-outset">{children}</div>
  </div>
)

export const LyricsBoxLayout = ({ buttonType, isMe, children }: LyricsBoxLayoutProps) => {
  return (
    <div className={`profile-songs__lyrics ${buttonType !== "Expand" ? "Expanded" : ""}`}>
      <div className="profile-songs__lyrics--bs-outset">{children}</div>
    </div>
  )
}

const Title = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className="profile-songs__no-songs-title">
      <p className="profile-songs__no-songs-title-text">
        {isLoading === true ? "Loading..." : "User hasn't saved any Flows"}
      </p>
    </div>
  )
}

export const BlankItem = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <li className="profile-songs__item">
      <SongItemBodyLayout
        header={
          <HeaderLayout>
            <Title isLoading={isLoading} />
          </HeaderLayout>
        }
        lyrics={
          <div className="profile-songs__lyrics--container">
            <LyricsBoxLayout buttonType="Close" isMe={false}>
              <div className="profile-songs__lyrics-text"></div>
            </LyricsBoxLayout>
          </div>
        }
      />
    </li>
  )
}
