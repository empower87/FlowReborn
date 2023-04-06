import { Reducer, useReducer } from "react"

const INITIAL_VIDEO_CONSTRAINTS: VideoConstraintsType = {
  height: 648,
  width: 365,
  aspectRatio: 1.777777778,
  facingMode: "user",
  deviceId: undefined,
}

const INITIAL_AUDIO_CONSTRAINTS: AudioConstraintsType = {
  echoCancellation: true,
  noiseSuppression: true,
  volume: 1,
  deviceId: undefined,
}

const INITIAL_GETUSERMEDIA_CONSTRAINTS: GetUserMediaConstraints = {
  video: INITIAL_VIDEO_CONSTRAINTS,
  audio: true,
}

type Device = {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

type VideoConstraintsType = {
  height: number
  width: number
  aspectRatio: number
  facingMode: "user" | "environment"
  deviceId?: string | undefined
}
type AudioConstraintsType = {
  echoCancellation: boolean
  noiseSuppression: boolean
  volume: number
  deviceId?: string | undefined
}

export type GetUserMediaConstraints = {
  video: VideoConstraintsType | false
  audio: AudioConstraintsType | true
}

type State = {
  type: "video" | "audio"
  facingMode: "user" | "environment"
  device: Device | undefined
  videoConstraints: VideoConstraintsType
  audioConstraints: AudioConstraintsType
  constraints: GetUserMediaConstraints
}

export const INITIAL_STATE_OPTIONS: State = {
  type: "video",
  facingMode: "user",
  device: undefined,
  videoConstraints: INITIAL_VIDEO_CONSTRAINTS,
  audioConstraints: INITIAL_AUDIO_CONSTRAINTS,
  constraints: INITIAL_GETUSERMEDIA_CONSTRAINTS,
}

type Action = {
  type: string
  payload: {
    recordingType?: "video" | "audio"
    device?: Device
    facingMode?: "user" | "environment"
  }
}

export const recorderOptionsReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_FACING_MODE":
      const _facingMode = action.payload.facingMode
      if (!_facingMode) return state
      const videoConstraintsWithNewFacingMode = { ...state.videoConstraints, facingMode: _facingMode }
      if (state.type === "video") {
        return {
          ...state,
          facingMode: _facingMode,
          videoConstraints: videoConstraintsWithNewFacingMode,
          constraints: { ...state.constraints, video: videoConstraintsWithNewFacingMode },
        }
      } else {
        return { ...state, facingMode: _facingMode, videoConstraints: videoConstraintsWithNewFacingMode }
      }
    case "SET_RECORDING_TYPE":
      const _type = action.payload.recordingType
      if (!_type) return state
      if (_type === "video") {
        if (state.type === "video") return state
        else {
          return {
            ...state,
            type: "video",
            constraints: {
              video: state.videoConstraints,
              audio: true,
            },
          }
        }
      } else {
        if (state.type === "audio") return state
        else {
          return {
            ...state,
            type: "audio",
            constraints: {
              video: false,
              audio: state.device && state.device.kind === "audioinput" ? state.audioConstraints : true,
            },
          }
        }
      }

    case "SET_MEDIA_DEVICE":
      const _device = action.payload.device
      if (!_device) return state
      if (_device.kind === "audioinput") {
        const audioConstraintsWithNewDeviceId = { ...state.audioConstraints, deviceId: _device.deviceId }
        return {
          ...state,
          type: "audio",
          device: _device,
          audioConstraints: audioConstraintsWithNewDeviceId,
          constraints: { video: false, audio: audioConstraintsWithNewDeviceId },
        }
      } else if (_device.kind === "videoinput") {
        const videoConstraintsWithNewDeviceId = { ...state.videoConstraints, deviceId: _device.deviceId }
        return {
          ...state,
          type: "video",
          device: _device,
          videoConstraints: videoConstraintsWithNewDeviceId,
          constraints: { video: videoConstraintsWithNewDeviceId, audio: true },
        }
      } else return state
    default:
      return INITIAL_STATE_OPTIONS
  }
}

export const useMediaStreamConstraints = () => {
  const [state, dispatch] = useReducer(recorderOptionsReducer, INITIAL_STATE_OPTIONS)
  const { type, facingMode, constraints } = state

  const mediaStreamConstraintsHandler = (
    action: "SET_FACING_MODE" | "SET_RECORDING_TYPE" | "SET_MEDIA_DEVICE",
    payload?: Device
  ) => {
    switch (action) {
      case "SET_FACING_MODE":
        const selectMode = facingMode === "user" ? "environment" : "user"
        dispatch({ type: action, payload: { facingMode: selectMode } })
        break
      case "SET_RECORDING_TYPE":
        const recordingType = type === "video" ? "audio" : "video"
        dispatch({ type: action, payload: { recordingType: recordingType } })
        break
      case "SET_MEDIA_DEVICE":
        if (!payload) return
        dispatch({ type: action, payload: { device: payload } })
        break
    }
  }

  return {
    constraints,
    mediaStreamConstraintsHandler,
  }
}
