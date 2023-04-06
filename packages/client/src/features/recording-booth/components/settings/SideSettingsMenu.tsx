import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"
import { DotMenuModal, DotMenuModalItem } from "src/components/modals/Dots/DotMenu"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import { SettingsDispatcher, SettingsState, useSuggestionSettingsContext } from "../../hooks/useSuggestionSettings"
import SettingsModal from "./SettingsModal/SettingsModal"

export type SettingsProps = {
  state: SettingsState
  dispatch: SettingsDispatcher
}

type MediaStreamConstraintsButtonsType = {
  onClick: (action: "SET_MEDIA_DEVICE" | "SET_FACING_MODE" | "SET_RECORDING_TYPE", payload?: Device | undefined) => void
}

const FacingModeButton = ({ onClick }: MediaStreamConstraintsButtonsType) => {
  console.log("TESING: FacingModeButton rerendered")
  return (
    <SideButton type="Rotate" isActive={false} hasUser={false} onClick={() => onClick("SET_FACING_MODE")} size={60} />
  )
}

const RecordingTypeButton = ({ onClick }: MediaStreamConstraintsButtonsType) => {
  const constraints = { video: true }
  console.log("TESTING: RecordingTypeButton rerendered")
  return (
    <SideButton
      type={constraints.video ? "NoVideo" : "AddVideo"}
      onClick={() => onClick("SET_RECORDING_TYPE")}
      isActive={constraints.video ? true : false}
      hasUser={false}
      size={65}
    />
  )
}

type Device = {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

function CameraDevicesModal({
  isOpen,
  onClose,
  onClick,
}: {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  onClick: MediaStreamConstraintsButtonsType["onClick"]
}) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  useEffect(() => {
    const getCameraSelection = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === "videoinput" || device.kind === "audioinput")
      console.log(devices, videoDevices, "devices input")
      if (!videoDevices) return
      setDevices(videoDevices)
    }

    getCameraSelection()
  }, [])

  const onClickHandler = (device: Device) => {
    onClick("SET_MEDIA_DEVICE", device)
    onClose(false)
  }

  return (
    <DotMenuModal isOpen={isOpen} onClose={onClose}>
      {devices.map((each) => {
        return (
          <DotMenuModalItem
            key={each.deviceId}
            icon="Edit"
            title={each.label}
            size={80}
            onClick={() => onClickHandler(each)}
          />
        )
      })}
    </DotMenuModal>
  )
}

const CameraOptionsButton = ({ onClick }: MediaStreamConstraintsButtonsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  console.log("TESTING: CameraOptionsButton rerendered")
  return (
    <>
      {isOpen && <CameraDevicesModal isOpen={isOpen} onClose={setIsOpen} onClick={onClick} />}

      <SideButton
        type="Camera"
        onClick={() => setIsOpen((prev) => !prev)}
        isActive={isOpen}
        hasUser={false}
        size={70}
      />
    </>
  )
}

export const RecorderOptionButtons = ({ onClick }: MediaStreamConstraintsButtonsType) => {
  return (
    <>
      <FacingModeButton onClick={onClick} />
      <RecordingTypeButton onClick={onClick} />
      <CameraOptionsButton onClick={onClick} />
    </>
  )
}

export default function SideSettingsMenu({ recorderConstraintButtons }: { recorderConstraintButtons: ReactNode }) {
  const { toggleModal, toggleSettingsModalHandler } = useSuggestionSettingsContext()

  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<SideSettingsMenu /> -- Render test -- Layout 1")
  return (
    <>
      {toggleModal !== "Hide" && <SettingsModal />}

      <div className="recording-booth__side-menu">
        <SideButtonMenu>
          {recorderConstraintButtons}
          <SideButton
            type="Opacity"
            onClick={() => toggleSettingsModalHandler("UIOpacity")}
            isActive={toggleModal === "UIOpacity"}
            hasUser={false}
            size={75}
          />
          <SideButton
            type="Songs"
            onClick={() => toggleSettingsModalHandler("Beat")}
            isActive={toggleModal === "Beat"}
            hasUser={false}
            size={80}
          />
          <SideButton
            type="Settings"
            onClick={() => toggleSettingsModalHandler("Rhymes")}
            isActive={toggleModal === "Rhymes"}
            hasUser={false}
            size={70}
          />
        </SideButtonMenu>
      </div>
    </>
  )
}
