import { IComment } from "../../../../../../../server/src/models/Comment"

export default function CommentList({ showReplies, songComments }: { showReplies: boolean; songComments: IComment[] }) {
  return (
    <div className="comments__list--container">
      <div className="comments__list--shadow-outset">
        <div className="comments__list--shadow-inset">
          <ul className="comments__list">
            {/* {showReplies ? (
              <ul className="comments__list">
                <ReplyList comment={selectedComment} test={songComments} />
              </ul>
            ) : (
              <ul className="comments__list">
                {songComments?.map((item, index) => {
                  let isLast = false
                  if (songComments.length - 1 === index) isLast = true
                  return (
                    <CommentItem
                      key={item._id}
                      comment={item}
                      setComment={setSelectedComment}
                      song={currentSong}
                      openInputModal={toggleInputModalHandler}
                      editId={editId}
                      isLast={isLast}
                    />
                  )
                })}
              </ul>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  )
}
