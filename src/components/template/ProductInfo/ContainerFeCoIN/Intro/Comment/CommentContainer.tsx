import Comments from "./Comments/Comments";
import FormComment from "./Form/FormComment";

export default function CommentContainer() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4">
        <FormComment />
      </div>
      <div className="col-span-8">
        <Comments />
      </div>
    </div>
  );
}
