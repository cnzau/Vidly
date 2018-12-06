import React, { Component } from "react";
import _ from "lodash"; // used to get nested properties like in genre.name

class TableBody extends Component {
  renderCell = (item, column) => {
    // if column exists/defined we give it an item/movie we are rendering
    if (column.content) return column.content(item);
    // else we return the property of this item
    // column.path can be nested when using lodash
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr>
            {columns.map(column => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
