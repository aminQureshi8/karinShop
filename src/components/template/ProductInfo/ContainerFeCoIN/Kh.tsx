import ContainerFeCoIN from "./ContainerFeCoIN";

export default function Kh({ description, features, id, userID, comments , brand }) {
  return (
    <div>
      <ContainerFeCoIN
        description={description}
        features={features}
        id={id}
        userID={userID}
        comments={comments}
        brand={brand}
      />
    </div>
  );
}
