import React from "react";
import { Form } from "react-bootstrap";

/**
 * A controlled inline form component to switch between options by selecting
 * radio buttons.
 */
class RadioChoices extends React.Component {
  render() {
    const { name, choices, labels, selected, onSelect } = this.props;
    return (
      <Form inline className="mx-4 mb-3">
        <Form.Label className="mr-4">
          {name[0].toUpperCase() + name.substring(1) + ":"}{" "}
        </Form.Label>
        {choices.map((choice, i) => (
          <Form.Check
            className="mr-4"
            type="radio"
            name={name}
            value={choice}
            checked={selected === choice}
            onChange={onSelect}
            label={labels[i]}
          />
        ))}
      </Form>
    );
  }
}

export default RadioChoices;
