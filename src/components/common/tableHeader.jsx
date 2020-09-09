import React, { Component } from "react";

// columns: array
// columnSort: object
// onSort: function

class TableHeader extends Component {
  raiseSort = (path) => {
    const columnSort = { ...this.props.columnSort };

    if (columnSort.path === path) {
      columnSort.order = columnSort.order === "asc" ? "desc" : "asc";
    } else {
      columnSort.path = path;
      columnSort.order = "asc";
    }

    this.props.onSort(columnSort);
  };

  renderSortIcon = (column) => {
    const { columnSort } = this.props;

    if (column.path !== columnSort.path) {
      return null;
    }

    if (columnSort.order === 'asc') {
      return <i className='fa fa-sort-asc' />
    }

    return <i className='fa fa-sort-desc' />
  }

  render() {
    return (
      <thead >
        <tr>
          {this.props.columns.map((column) => (
            <th
              className='clickable'
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} { this.renderSortIcon(column) }
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
