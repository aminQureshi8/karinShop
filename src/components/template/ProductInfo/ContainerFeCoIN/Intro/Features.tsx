

export default function Features({ features }) {
  console.log("features", features);

  return (
    <div>
      {features.map((feature, index) => (
        <div key={index} className="mb-3">
          <h4 className="font-bold mb-2">{feature.name}</h4>
          <p>{feature.value}</p>
        </div>
      ))}
    </div>
  );
}
