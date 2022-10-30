import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import ReactDOM from "react-dom"
// import { v4 as uuidv4 } from 'uuid'
import { closeIcon } from "../assets/images/_icons"

type Props = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  focusBorder: number
  setFocusBorder: Dispatch<SetStateAction<number>>
}

export const RecordingBoothModal = ({
  isOpen,
  onClose,
  focusBorder,
  setFocusBorder,
}: Props) => {
  const root = document.getElementById("root")!
  let modalObjArr = [
    {
      index: 0,
      title: "Welcome to the Flow Recording Booth",
      steps: [
        {
          step: "",
          stepText: `In this tutorial you learn all you need to know to start Flowing.
                 After which you'll have no excuses for not reaching your Rap God 
                 letslakdjfladskjflasjdf alsdkjfa lsdjfalsdjf akdjfsldf jsldfkjs 
                 lsdkjflsdkjflasdsjkf djfdkfj aldfjkf dfk djf jdka sdfdklj flkj 
                 potential! Let's get started, please hit the next button below`,
          show: true,
        },
      ],
    },
    {
      index: 1,
      title: "Flow Controls",
      steps: [
        {
          step: "Choose Beat",
          stepText: `Select a dope beat to Flow over from our Collection.`,
          show: true,
        },
        {
          step: "Record",
          stepText: `When you're ready, just hit the Record button and start Flowing!`,
          show: false,
        },
        {
          step: "Save It",
          stepText: `After your track has been layed, save and upload to your profile so you can post it for all your homies to see!`,
          show: false,
        },
      ],
    },
    {
      index: 2,
      title: "Rhyme Suggestions",
      steps: [
        {
          step: "Rhymes",
          stepText: `As you finish rapping a line, we'll generate some popular rhymes to keep you in Flow!`,
          show: true,
        },
        {
          step: "Locked Rhymes",
          stepText: `To save your generated rhyme above for your next line, hit the lock button to save it here.`,
          show: false,
        },
        {
          step: "Selected Rhymes",
          stepText: `Still not satisfied with the generated rhymes? Click any word you've rapped and generate rhymes for your that here.`,
          show: false,
        },
      ],
    },
    {
      index: 3,
      title: "Lyrics Display",
      steps: [
        {
          step: "Lyrics Transcript",
          stepText: `A real time transcript of your Flow will appear here.`,
          show: true,
        },
        {
          step: "Lyrics List",
          stepText: `Your lyrics will auto generate in this field so you can see all your genius rhymes.`,
          show: false,
        },
      ],
    },
  ]
  const [modalInDisplay, setModalInDisplay] = useState(modalObjArr[0])
  const [modalSteps, setModalSteps] = useState(modalObjArr[0].steps)
  const [currentStep, setCurrentStep] = useState(modalObjArr[0].steps[0])
  const [endOfModal, setEndOfModal] = useState<boolean>(true)
  const [beginOfModal, setBeginOfModal] = useState<boolean>(true)
  const [arrowClass, setArrowClass] = useState<string>()
  const [focusClass, setFocusClass] = useState<string>()
  const [modalPositionClass, setModalPositionClass] = useState<string>("")
  const [arrowDirectionClass, setArrowDirectionClass] = useState<string>("down")

  const modalWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      modalInDisplay.index === 3 &&
      modalSteps[modalSteps.length - 1].step === currentStep.step
    ) {
      setEndOfModal(true)
    } else {
      setEndOfModal(false)
    }
  }, [currentStep])

  useEffect(() => {
    if (modalInDisplay.index !== 0) {
      setBeginOfModal(false)
    } else {
      setBeginOfModal(true)
    }
  }, [modalInDisplay])

  useEffect(() => {
    if (!currentStep.show) {
      let newModalInDisplay = modalInDisplay.steps.map((each) => {
        if (each.step === currentStep.step) {
          return { ...each, show: true }
        } else {
          return each
        }
      })
      setModalInDisplay((prevModal) => ({
        ...prevModal,
        steps: newModalInDisplay,
      }))
    }
  }, [currentStep])

  useEffect(() => {
    if (modalInDisplay.index === 0)
      return setModalBodyClasses("first-modal", "down")
    else if (modalInDisplay.index === 1)
      return setModalBodyClasses("second-modal", "down")
    else if (modalInDisplay.index === 2)
      return setModalBodyClasses("third-modal", "up")
    else if (modalInDisplay.index === 3)
      return setModalBodyClasses("fourth-modal", "up")
  }, [modalInDisplay])

  useEffect(() => {
    if (currentStep.step === modalObjArr[0].steps[0].step)
      return setTipClasses("arrow-zero-zero", "focus-zero-zero", 0)
    else if (currentStep.step === modalObjArr[1].steps[0].step)
      return setTipClasses("arrow-one-one", "focus-one-one", 10)
    else if (currentStep.step === modalObjArr[1].steps[1].step)
      return setTipClasses("arrow-one-two", "focus-one-two", 11)
    else if (currentStep.step === modalObjArr[1].steps[2].step)
      return setTipClasses("arrow-one-three", "focus-one-three", 12)
    else if (currentStep.step === modalObjArr[2].steps[0].step)
      return setTipClasses("arrow-two-one", "focus-two-one", 20)
    else if (currentStep.step === modalObjArr[2].steps[1].step)
      return setTipClasses("arrow-two-two", "focus-two-two", 21)
    else if (currentStep.step === modalObjArr[2].steps[2].step)
      return setTipClasses("arrow-two-three", "focus-two-three", 22)
    else if (currentStep.step === modalObjArr[3].steps[0].step)
      return setTipClasses("arrow-three-one", "focus-three-one", 30)
    else if (currentStep.step === modalObjArr[3].steps[1].step)
      return setTipClasses("arrow-three-two", "focus-three-two", 31)
  }, [currentStep])

  const showArrow = useCallback(() => {
    return (
      <div className={`arrow-container ${arrowClass}`}>
        <div className={`arrow-head ${arrowDirectionClass}`}></div>
      </div>
    )
  }, [arrowClass])

  const mapSteps = useCallback(() => {
    return modalInDisplay?.steps.map((each, index) => {
      return (
        <div
          className={`steps_shadow-div-inset ${
            currentStep.step === each.step ? "highlight-step" : ""
          }`}
          key={`${index}_${each.step}`}
          style={each.show === true ? { opacity: "1" } : { opacity: "0" }}
        >
          <div className="steps__index">
            <div className="steps__index--shadow-div-outset">{index + 1}</div>
          </div>
          <div className="steps__steps">
            <p className="steps__text title">{each.step}</p>
            <p className="steps__text text">{each.stepText}</p>
          </div>
        </div>
      )
    })
  }, [modalInDisplay, currentStep])

  const setModalBodyClasses = (section: string, direction: string) => {
    setModalPositionClass(section)
    setArrowDirectionClass(direction)
  }

  const setTipClasses = (arrow: string, focus: string, num: number) => {
    setArrowClass(arrow)
    setFocusClass(focus)
    setFocusBorder(num)
  }

  const closeWindowHandler = () => {
    onClose(false)
    setModalInDisplay(modalObjArr[0])
    setModalSteps(modalObjArr[0].steps)
    setCurrentStep(modalObjArr[0].steps[0])
    setEndOfModal(false)
    setBeginOfModal(true)
    setArrowDirectionClass("down")
    setArrowClass("")
    setModalPositionClass("")
    setFocusClass("")
  }

  const microStepHandler = () => {
    modalSteps.forEach((each, index) => {
      if (each.step === currentStep.step) {
        if (index + 1 !== null) {
          setCurrentStep(modalSteps[index + 1])
        }
      }
    })
  }

  const macroStepHandler = (direction: string) => {
    modalObjArr.forEach((each) => {
      if (each.index === modalInDisplay.index) {
        if (direction === "back") {
          if (modalSteps[0].step !== currentStep.step) {
            setModalInDisplay(modalObjArr[each.index])
            setModalSteps(modalObjArr[each.index].steps)
            setCurrentStep(modalObjArr[each.index].steps[0])
          } else if (each.index !== 0) {
            setModalInDisplay(modalObjArr[each.index - 1])
            setModalSteps(modalObjArr[each.index - 1].steps)
            setCurrentStep(modalObjArr[each.index - 1].steps[0])
          }
        } else {
          if (modalSteps[modalSteps.length - 1].step !== currentStep.step) {
            microStepHandler()
          } else if (each.index !== 3) {
            setModalInDisplay(modalObjArr[each.index + 1])
            setModalSteps(modalObjArr[each.index + 1].steps)
            setCurrentStep(modalObjArr[each.index + 1].steps[0])
          }
        }
      }
    })
  }
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="RecordBoothModal" ref={modalWindowRef}>
      <div
        className={`opacity-section-1 ${
          modalInDisplay.index === 3 ? `${focusClass}` : ""
        }`}
      ></div>
      <div
        className={`opacity-section-2 ${
          modalInDisplay.index === 2 ? `${focusClass}` : ""
        }`}
      ></div>
      <div
        className={`opacity-section-3 ${
          modalInDisplay.index === 1 ? `${focusClass}` : ""
        }`}
      ></div>

      <div className="close-window-container">
        <button
          className="close-window-btn"
          onClick={() => closeWindowHandler()}
        >
          <img className="button-icons" src={closeIcon} alt="exit" />
        </button>
      </div>

      <div className={`section-4_controls ${modalPositionClass}`}>
        <div className="section_shadow-div-inset">
          <div className="section_next-container">
            <div className="next-container_shadow-div-inset">
              {modalInDisplay.title}
            </div>
          </div>
          <div className="section_text-container">
            <div className="text-container_shadow-div-outset">{mapSteps()}</div>
          </div>
        </div>
      </div>

      {showArrow()}

      <div className="modal-navigation-container">
        <div className="modal-navigation_shadow-div-inset">
          <div className="modal-navigation_shadow-div-outset">
            {!beginOfModal ? (
              <button
                className="next-back-btn back-btn"
                onClick={() => macroStepHandler("back")}
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            {!endOfModal ? (
              <button
                className="next-back-btn next-btn"
                onClick={() => macroStepHandler("next")}
              >
                Next
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>,
    root
  )
}
