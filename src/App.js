import React from "react";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div>
      <Options optionType="scoops" />
      <hr class="border border-primary border-3" />
      <Options optionType="toppings" />
    </div>
  );
}

export default App;
