import { addComment } from "../reducers/blogReducer"

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const createNewComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    dispatch(addComment({
      id: id,
      text: comment
    })).catch((error) => {
      const errorNotification = {
      message: "Please sign in to comment!",
      isError: true,
      };

      dispatch(setNotification(errorNotification));
      setTimeout(() => {
                dispatch(setNotification(null));
                }, 5000)
      })
  }

  return (
    <div class="mx-2 border-t-2 border-black">
      <form onSubmit={createNewComment} class="flex flex-row items-center justify-between">
        <textarea name="comment" class="border-2 w-full resize-y my-2" placeholder="comment..." />
        <button type="submit" className="button-generic my-2">Add</button>
      </form>
    </div>
  )
}

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div>
        <b>{comment.userInfo.username}</b>
      </div>
      <div class="mx-2">
        {comment.text}
      </div>
    </div>
  )
}

const Comments = ({ id, comments }) => {
  return (
    <div>
      {comments.map((comment => (
        <Comment comment={comment} />
      )))}
      <CommentForm id={id} />
    </div>
  )
}

export default Comments