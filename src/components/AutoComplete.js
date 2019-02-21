import React from "react";
import PropTypes from "prop-types";
import { names } from "../data/names";
import Autosuggest from "react-autosuggest";

const nameObjects = names.map(name => ({ name }));

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return nameObjects === 0
    ? []
    : nameObjects.filter(
        obj => obj.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

export default class AutoComplete extends React.Component {
  static propTypes = {
    setSelectedName: PropTypes.func
  };

  state = {
    value: "",
    suggestions: [],
    selectionMade: false
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
      selectionMade: false
    });
    this.props.setSelectedName(undefined);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    this.setState(() => ({ selectionMade: true }));
    this.props.setSelectedName(suggestionValue);
  };

  clearInput = () => {
    this.setState(() => ({ value: "" }));
  };
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Recipient",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          highlightFirstSuggestion={true}
        />
        {this.state.suggestions.length === 0 &&
          this.state.value !== "" &&
          !this.state.selectionMade && (
            <p className="input-error">
              There is no such person in your contact list
            </p>
          )}
      </div>
    );
  }
}
