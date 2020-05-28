import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VehicleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: 0,
      jobs: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit(this);
  }

  /**
   * Handles input events
   * @param {Event} e event args
   */
  onChange(e) {
    const val = e.target.value;
    const id = e.target.id;
    switch (id) {
      case 'make':
        this.setState((state) => ({
          make: val,
          model: state.model,
          year: state.year,
        }));
        break;
      case 'model':
        this.setState((state) => ({
          make: state.make,
          model: val,
          year: state.year,
        }));
        break;
      case 'year':
        this.setState((state) => ({
          make: state.make,
          model: state.model,
          year: val,
        }));
        break;
    
      default:
        console.error('no input id found.');
        break;
    }
    console.log(this.state);
  }

  handleSubmit() {
    this.props.finish(this.state);
    console.log(this.state);
  }

  render() { 
    return (
      <form>
        <label>Make:
          <input id="make" type="text" onChange={this.onChange} value={this.state.make} />
        </label>
        <label>Model:
          <input id="model" type="text" onChange={this.onChange} value={this.state.model} />
        </label>
        <label>Year:
          <input id="year" type="number" onChange={this.onChange} value={this.state.year} />
        </label>
        <button type="button" onClick={this.handleSubmit}>New Vehicle</button>
      </form>
    );
  }
}
VehicleEntry.propTypes = {
  finish: PropTypes.func.isRequired,
};

export default VehicleEntry;