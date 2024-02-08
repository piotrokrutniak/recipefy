export default function Footbar() {
  return (
    <div 
      className="w-full bottom-0 h-20 bg-black p-12 md:p-24 flex justify-center place-items-center text-center text-white"
    >
      <Signature />
    </div>
  );
}

export function Signature() {
  return <p>{"© Piotr Okrutniak " + new Date().getFullYear()}</p>;
}
