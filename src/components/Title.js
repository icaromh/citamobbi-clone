import React from "react";

const Title = props => (
  <div className="title-area">
    <span>
      {props.isLoading ? '⌛' : <b>{props.data.routeCode}</b>}
      {` - ${props.data.serviceMnemonic}`}
    </span>
    <button onClick={props.onClear}>Limpar</button>
  </div>
);

export default Title;
