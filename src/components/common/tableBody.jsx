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

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
