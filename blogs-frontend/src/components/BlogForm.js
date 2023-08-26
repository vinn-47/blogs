import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const text = event.target.text.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.text.value = ''

    dispatch(createBlog({
      title: title,
      author: author,
      text: text
    }))

    const updateNotification = {
      message: `Added new blog "${title}" by ${author}`,
      isError: false,
    };
    dispatch(setNotification(updateNotification));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  }

  return (
    <div className="blog-form">
      <div class="font-bold text-lg">Create new blog entry</div>
      <form onSubmit={addBlog} class="flex flex-col items-start my-2">
        <input name="title" placeholder="title" class="border-2 w-full" />
        <br />
        <input name="author" placeholder="author" class="border-2 w-full" />
        <br />
        <textarea name="text" placeholder="text" class="border-2 resize-y w-full" />
        <br />
        <button type="submit" class="button-generic">submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
