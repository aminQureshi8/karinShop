import Comments from "./Comments/Comments";
import FormComment from "./Form/FormComment";

export default function CommentContainer({
  userID,
  id,
  comments,
}: {
  userID: string;
  id: string;
  comments: any;
}) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4">
        <FormComment userID={userID} id={id} />
      </div>
      <div className="col-span-8">
        <Comments comments={comments} />
      </div>
    </div>
  );
}
