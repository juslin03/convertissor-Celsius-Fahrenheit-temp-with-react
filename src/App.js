import React from "react";
import "./App.css";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <div className="alert alert-success">L'eau bout</div>;
  }
  return <div className="alert alert-info">L'eau ne bout pas.</div>;
}

function tryConvert(temperature, convert) {
  const value = parseFloat(temperature);
  if (Number.isNaN(value)) {
    return "";
  }
  return convert(value).toString();
}

class TemperatureInput extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // this.state = { temperature: "" };
  }

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const { temperature } = this.props;
    const name = "scale" + this.props.scale;
    const scaleName = scaleNames[this.props.scale];
    return (
      <div className="form-group">
        <label htmlFor={name}>temperature (en {scaleName})</label>
        <input
          type="text"
          id={name}
          value={temperature}
          className="form-control my-3"
          onChange={this.handleChange}
          placeholder={scaleName}
        />
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: "c",
      temperature: 20,
    };
  }

  handleCelsiusChange = (temperature) => {
    this.setState({ scale: "c", temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({
      scale: "f",
      temperature,
    });
  };

  render() {
    const { temperature, scale } = this.state;
    const celsius =
      scale === "c" ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit =
      scale === "f" ? temperature : tryConvert(temperature, toFahrenheit);
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}

export default Calculator;
