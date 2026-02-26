export default function Intro({ description }: { description: string }) {
  return <div dangerouslySetInnerHTML={{ __html: description }}></div>;
}
