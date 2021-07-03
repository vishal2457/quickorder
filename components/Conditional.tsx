import React from "react";

function Conditional({ children, elseComponent, condition }) {
  const renderElse = (comp: any) => comp || null;
  return condition ? children : renderElse(elseComponent);
}

export default Conditional;
