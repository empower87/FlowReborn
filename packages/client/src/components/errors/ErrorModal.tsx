import React from 'react'
import ReactDOM from 'react-dom'
import { errorIcon } from '../../assets/images/_icons'

type ErrorModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  nextActions: string
  opacity: boolean
  modHeight: number
  modWidth: number
  placement: number
}

export default function ErrorModal({
  isOpen,
  onClose,
  title,
  nextActions,
  opacity,
  modHeight,
  modWidth,
  placement,
}: ErrorModalProps) {
  const root = document.getElementById('root')!

  const bgSpecs = {
    background: opacity ? '#0000006e' : '#00000000',
    opacity: isOpen ? 1 : 0,
    zIndex: isOpen ? 3 : 0,
  }
  const modalSpecs = {
    top: `${placement}%`,
    width: `${modWidth}%`,
    height: `${modHeight}px `,
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="ErrorModal" style={bgSpecs} onClick={() => onClose()}>
      {/* <div className="error-container--red" style={modalSpecs}>
        <div className="error--shadow-inset">
          <div className="icon-container">

                <button 
                  className="icon--shadow-outset"
                  onClick={() => onClose()}  
                >
                  <img className="button-icons" src={xExit} alt="exit x button" />
                </button>
          </div>
          <div className="text-container">
            <div className="text--shadow-outset">
              <div className="text-err-icon-container">
                <div className="text-err-icon--shadow-inset">
                  <img className="button-icons" src={errorExclamation} alt="error exclamation" />
                </div>
              </div>

              <div className="text-err-container">
                <h6>{title}</h6>
                <p>{nextActions}</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="error-container--input-err" style={modalSpecs}>
        <div className="error--shadow-inset">
          <div className="icon-container">
            {/* <div className="error-icon_shadow-div-outset">
            <div className="error-icon_shadow-div-inset"> */}
            <button className="icon--shadow-outset" onClick={() => onClose()}>
              <div className="icon--shadow-inset">
                <img className="button-icons" src={errorIcon} alt="exit x button" />
              </div>
            </button>
            {/* </div>
          </div> */}
          </div>
          <div className="text-container">
            <div className="text--shadow-outset">
              <div className="text-err-container">
                <h6>{title}</h6>
                <p>{nextActions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    root,
  )
}

// const InputErrorModal = () => {

//   return (
//     <div className="error-container--input-err" style={modalSpecs}>
//       <div className="error--shadow-inset">
//         <div
//           className="icon-container"
//         >
//           {/* <div className="error-icon_shadow-div-outset">
//             <div className="error-icon_shadow-div-inset"> */}
//               <button
//                 className="icon--shadow-outset"
//                 onClick={() => onClose()}
//               >
//                 <img className="button-icons" src={xExit} alt="exit x button" />
//               </button>
//             {/* </div>
//           </div> */}
//         </div>
//         <div className="text-container">
//           <div className="text--shadow-outset">
//             <div className="text-err-icon-container">
//               <div className="text-err-icon--shadow-inset">
//                 <img className="button-icons" src={errorExclamation} alt="error exclamation" />
//               </div>
//             </div>

//             <div className="text-err-container">
//               <h6>{title}</h6>
//               <p>{nextActions}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default function ErrorModal({ showErrorModal, setShowErrorModal }) {
//   // slightly blur entire screen
//   // take in text to specify the problem
//   // option to blur background
//   // specify position
//   // specify height, width

//   return (
//     <div
//       className="ErrorModal"
//       style={showErrorModal ? {opacity: "1", zIndex: "2"} : {opacity: "0", zIndex: "0"}}
//       onClick={() => setShowErrorModal(false)}
//     >
//       <div className="error-container--red">
//         <div className="error--shadow-inset">
//           <div className="icon-container">
//             {/* <div className="error-icon_shadow-div-outset">
//               <div className="error-icon_shadow-div-inset"> */}
//                 <button
//                   className="icon--shadow-outset"
//                   onClick={() => setShowErrorModal(false)}
//                 >
//                   <img className="button-icons" src={xExit} alt="error exclamation" />
//                 </button>
//               {/* </div>
//             </div> */}
//           </div>
//           <div className="text-container">
//             <div className="text--shadow-outset">
//               <h6>No Songs To Edit</h6>
//               <p>Record a Flow below!</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

//<div className="error-container">
//  <div className="error_shadow-div-inset">
//    <div className="error-icon-container">
//      <div className="error-icon_shadow-div-outset">
//        <div className="error-icon_shadow-div-inset">
//          <button
//            className="error-icon_shadow-div-outset_2"
//            onClick={() => setShowErrorModal(false)}
//          >
//            <img className="button-icons" src={xExit} alt="error exclamation" />
//          </button>
//        </div>
//      </div>
//    </div>
//    <div className="error-text-container">
//      <div className="error-text_shadow-div-outset">
//        <h5>No Songs To Edit</h5>
//        <p>Record a Flow below!</p>
//      </div>
//    </div>
//  </div>
//</div>
