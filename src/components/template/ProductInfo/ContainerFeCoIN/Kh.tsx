import ContainerFeCoIN from "./ContainerFeCoIN";

export default function Kh({ description, features, id, userID, comments }) {
  return (
    <div>
      <ContainerFeCoIN
        description={description}
        features={features}
        id={id}
        userID={userID}
        comments={comments}
      />
    </div>
  );
}
