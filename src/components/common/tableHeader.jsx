import React, { Component } from "react";

// Component INTERFACE
// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    // clone existing sortColumn
    const sortColumn = { ...this.props.sortColumn };
    // if sort is applied and path is same reverse/change sortorder else set path
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    // raise event
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
