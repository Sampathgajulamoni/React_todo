import { Component } from "react";
import Header from "../Header";
import './index.css'

const StatusInput = [
  { optionId: 'Not Done', displayText: 'Not Done' },
  { optionId: 'Done', displayText: 'Done' },
];

const PriorityOptions = ['High', 'Medium', 'Low']; // Optional: restrict priority

class Forms extends Component {
  state = {
    TextValue: '',
    SelectStatus: StatusInput[0].optionId,
    SelectPriority: '',
    errors: {} // To store validation errors
  }

  onChangeText = event => {
    this.setState({ TextValue: event.target.value });
  }

  onChangeSelect = event => {
    this.setState({ SelectStatus: event.target.value });
  }

  onChangePriority = event => {
    this.setState({ SelectPriority: event.target.value });
  }

  validateForm = () => {
    const { TextValue, SelectPriority } = this.state;
    const errors = {};

    if (TextValue.trim() === '') {
      errors.TextValue = "Text is required";
    }

    if (SelectPriority.trim() === '') {
      errors.SelectPriority = "Priority is required";
    } else if (!PriorityOptions.includes(SelectPriority)) {
      errors.SelectPriority = "Priority must be High, Medium, or Low";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0; // true if no errors
  }

  onGenerateTodos =async event => {
    event.preventDefault();
    const { TextValue, SelectStatus, SelectPriority } = this.state;
    const { addTodo } = this.props;

    if (!this.validateForm()) return; // Stop if validation fails

    addTodo(TextValue, SelectStatus, SelectPriority);

    // Reset form
    this.setState({
      TextValue: '',
      SelectStatus: StatusInput[0].optionId,
      SelectPriority: '',
      errors: {}
    });
  }

  render() {
    const { TextValue, SelectStatus, SelectPriority, errors } = this.state;
    return (
      <>
        <Header />
        <div className="todolist-form">
          <div className="form-container">
            <h1 className="add-todos-list">Add Todos</h1>
            <form className="Todos-forms" onSubmit={this.onGenerateTodos}>
              
              <div className="form-text-container">
                <p className="label-text">Text</p>
                <input 
                  value={TextValue} 
                  onChange={this.onChangeText} 
                  type="text" 
                  className="input-container" 
                />
                {errors.TextValue && <p className="error-text">{errors.TextValue}</p>}
              </div>

              <div className="form-text-container">
                <p className="label-text">Status</p>
                <select
                  className="selectcontainer"
                  value={SelectStatus}
                  onChange={this.onChangeSelect}
                >
                  {StatusInput.map(eachOption => (
                    <option 
                      className="optioncontainer" 
                      key={eachOption.optionId} 
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-text-container">
                <p className="label-text">Priority</p>
                <input 
                  type="text" 
                  value={SelectPriority} 
                  onChange={this.onChangePriority} 
                  className="input-container" 
                  placeholder="High, Medium, Low"
                />
                {errors.SelectPriority && <p className="error-text">{errors.SelectPriority}</p>}
              </div>

              <button type="submit" className="add-button">Add</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Forms;
