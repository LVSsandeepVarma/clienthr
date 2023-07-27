import React, { Component } from "react";
import TomSelect from "tom-select";

class MySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["opt1", "opt2"],
    };
  }

  handleChange = (items) => {
    this.setState({ items });
  };

  render() {
    return (
      <TomSelect
        new={true}
        id="multi-select"
        options={[
          { value: "opt1", text: "Option 1" },
          { value: "opt2", text: "Option 2" },
          { value: "opt3", text: "Option 3" },
        ]}
        items={this.state.items}
        onChange={this.handleChange}
      />
    );
  }
}

export default MySelect;
