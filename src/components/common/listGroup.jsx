import React from "react";

const ListGroup = props => {
  // textProperty and valueProperty are not coupled to genres.
  // hence this listgroup can be used with any kind of list
  const { items, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        //   Use bracket notation to access property dynamically
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
