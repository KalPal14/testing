import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  return (
    <div>
      <Options optionType="scoops" />
      <hr className="border border-primary border-3" />
      <Options optionType="toppings" />
    </div>
  );
}
