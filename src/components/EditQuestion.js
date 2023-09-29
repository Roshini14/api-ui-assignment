import { Component } from "react";
import { Select, Checkbox, Input, InputNumber } from "antd";
import { ReactComponent as AddSmall } from "./../assets/ic_addSmall.svg";
import { ReactComponent as ChoiceIcon } from "./../assets/ic_choice.svg";
import { ReactComponent as Remove } from "./../assets/ic_remove.svg";
const { TextArea } = Input;
export function Choice(props) {
  return (
    <div className="card-edit-question-choice">
      <ChoiceIcon /> &nbsp;
      <Input
        // type="text"
        placeholder="Type here"
        value={props.value}
        className="card-edit-question-choice-input"
        onChange={(e) => props.handleChange(e.target.value, props.index)}
      />{" "}
      &nbsp;
    </div>
  );
}
export class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: props.choices,
    };
  }

  handleChange = (choice, index) => {
    let dummyChoices = this.state.choices;
    dummyChoices[index] = choice;
    this.setState({
      choices: dummyChoices,
    });
    this.props.handleChoiceChange(dummyChoices);
  };
  render() {
    const { choices } = this.state;
    return (
      <div className="card-edit-question-choices">
        <div className="card-edit-question-choices-header">Choice</div>
        {choices.map((choice, index) =>
          index === choices.length - 1 ? (
            <div className="card-edit-question-choice-container">
              <Choice
                value={choice}
                handleChange={(choice, index) =>
                  this.handleChange(choice, index)
                }
                index={index}
              />
              <AddSmall
                type="button"
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  this.setState((prevState) => ({
                    choices: [...prevState.choices, ""],
                  }))
                }
              />
            </div>
          ) : (
            <Choice
              value={choice}
              handleChange={(choice, index) =>
                (choices[index] = this.handleChange(choice, index))
              }
              index={index}
            />
          )
        )}
        <Checkbox
          onChange={this.props.handleOthersChange}
          checked={this.props.others}
        >
          {" "}
          &nbsp; Enable "Other" option
        </Checkbox>
        <div className="card-edit-question-max-choices">
          <label>
            Max Choice Allowed
            <InputNumber
              label="maxChoice"
              placeholder="Enter number of choice allowed here"
              className="card-edit-question-name-input"
              value={this.props.maxChoice}
              type="number"
              onChange={(e) => this.props.handleMaxChoiceChange(e.target.value)}
            />
          </label>
        </div>
      </div>
    );
  }
}
export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: props.choices,
    };
  }

  handleChange = (choice, index) => {
    let dummyChoices = this.state.choices;
    dummyChoices[index] = choice;
    this.setState({
      choices: dummyChoices,
    });
    this.props.handleChoiceChange(dummyChoices);
  };
  render() {
    const { choices } = this.state;
    return (
      <div className="card-edit-question-choices">
        <div className="card-edit-question-choices-header">Choice</div>
        {choices.map((choice, index) =>
          index === choices.length - 1 ? (
            <div className="card-edit-question-choice-container">
              <Choice
                value={choice}
                handleChange={(choice, index) =>
                  this.handleChange(choice, index)
                }
                index={index}
              />
              <AddSmall
                type="button"
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  this.setState((prevState) => ({
                    choices: [...prevState.choices, ""],
                  }))
                }
              />
            </div>
          ) : (
            <Choice
              value={choice}
              handleChange={(choice, index) =>
                (choices[index] = this.handleChange(choice, index))
              }
              index={index}
            />
          )
        )}
        <Checkbox
          onChange={this.props.handleOthersChange}
          checked={this.props.others}
        >
          {" "}
          &nbsp; Enable "Other" option
        </Checkbox>
      </div>
    );
  }
}

export class VideoBased extends Component {
  render() {
    const {
      maxDur,
      handleMaxDurChange,
      additionalInfo,
      handleInfoChange,
      timeUnit,
      handleTimeUnitChange,
      timeUnits,
    } = this.props;

    return (
      <div className="card-edit-question-video-based">
        <TextArea
          autoSize
          name="additional-info"
          placeholder="Additional Information"
          className="card-edit-question-additional-info"
          value={additionalInfo}
          onChange={(e) => handleInfoChange(e.target.value)}
          cols={5}
        />
        <div className="card-edit-question-duration">
          <Input
            className="card-edit-question-duration-number"
            // type="number"
            value={maxDur}
            onChange={(e) => handleMaxDurChange(e.target.value)}
            placeholder="Max duration of video in sec/min"
          />
          <Select
            className="card-edit-question-duration-unit"
            value={timeUnit}
            onChange={handleTimeUnitChange}
            options={timeUnits}
            name="time-unit"
            label="time-unit"
            placeholder="Select Seconds or Minutes"
          />
        </div>
      </div>
    );
  }
}

class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currQuestion: {
        type: props.question.type,
        question: props.question.question,
        choices: props.question.choices,
        maxChoice: props.question.maxChoice,
        others: props.question.others,
        additionalInfo: props.question.additionalInfo,
        maxDur: props.question.maxDur,
        timeUnit: props.question.timeUnit,
      },
    };
  }
  render() {
    const questionTypes = [
      { id: 0, value: "Paragraph", label: "Paragraph" },
      { id: 1, value: "Short Answer", label: "Short Answer" },
      { id: 2, value: "Yes/No", label: "Yes/No" },
      { id: 3, value: "Dropdown", label: "Dropdown" },
      { id: 4, value: "Multiple Choice", label: "Multiple Choice" },
      { id: 5, value: "Date", label: "Date" },
      { id: 6, value: "Number", label: "Number" },
      { id: 7, value: "File Upload", label: "File Upload" },
      { id: 8, value: "Video Question", label: "Video Question" },
    ];

    const timeUnits = [
      { id: 0, value: "seconds", label: "Seconds" },
      { id: 1, value: "minutes", label: "Minutes" },
    ];
    const { handleRemoveQuestion, handleSaveQuestion, question } = this.props;
    const { currQuestion } = this.state;
    return (
      <section>
        <div className="card-edit-question">
          Type
          <Select
            options={questionTypes}
            autoFocus
            isSearchable={false}
            name="question-type"
            placeholder="Select question type"
            label="Type"
            className="card-edit-question-type"
            value={questionTypes.find((type) => type.value === question.type)}
            onChange={(option) => {
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  type: option,
                },
              }));
            }}
          />
        </div>
        <div className="card-edit-question-name">
          <label>
            Question
            <Input
              label="Question"
              placeholder="Type here"
              className="card-edit-question-name-input"
              value={this.state.currQuestion.question}
              onChange={(e) =>
                this.setState((prevState) => ({
                  currQuestion: {
                    ...prevState.currQuestion,
                    question: e.target.value,
                  },
                }))
              }
            />
          </label>
        </div>
        {currQuestion.type === "Multiple Choice" && (
          <MultipleChoice
            choices={currQuestion.choices}
            others={currQuestion.others}
            maxChoice={currQuestion.maxChoice}
            handleChoiceChange={(choices) =>
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  choices: choices,
                },
              }))
            }
            handleOthersChange={() =>
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  others: !prevState.currQuestion.others,
                },
              }))
            }
            handleMaxChoiceChange={(num) => {
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  maxChoice: num,
                },
              }));
            }}
          />
        )}
        {currQuestion.type === "Dropdown" && (
          <Dropdown
            choices={currQuestion.choices}
            others={currQuestion.others}
            maxChoice={currQuestion.maxChoice}
            handleChoiceChange={(choices) =>
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  choices: choices,
                },
              }))
            }
            handleOthersChange={() =>
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  others: !prevState.currQuestion.others,
                },
              }))
            }
          />
        )}
        {currQuestion.type === "Yes/No" && (
          <div className="card-edit-question-disqualify">
            <Checkbox
              onChange={() =>
                this.setState((prevState) => ({
                  currQuestion: {
                    ...prevState.currQuestion,
                    disqualify: !prevState.currQuestion.disqualify,
                  },
                }))
              }
              checked={currQuestion.disqualify}
            >
              &nbsp;Disqualify candidate if the answer is no
            </Checkbox>
          </div>
        )}
        {currQuestion.type === "Video Question" && (
          <VideoBased
            maxDur={currQuestion.maxDur}
            timeUnit={
              currQuestion.timeUnit
                ? timeUnits.find((unit) => unit.value === currQuestion.timeUnit)
                : null
            }
            timeUnits={timeUnits}
            additionalInfo={currQuestion.additionalInfo}
            handleMaxDurChange={(num) => {
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  maxDur: num,
                },
              }));
            }}
            handleTimeUnitChange={(option) => {
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  timeUnit: option.value,
                },
              }));
            }}
            handleInfoChange={(value) => {
              this.setState((prevState) => ({
                currQuestion: {
                  ...prevState.currQuestion,
                  additionalInfo: value,
                },
              }));
            }}
          />
        )}
        <div className="card-edit-question-save-delete">
          <div
            type="button"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleRemoveQuestion(question.id)}
            className="card-edit-question-delete"
          >
            <Remove /> &nbsp; Delete question
          </div>
          <div
            type="button"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              handleSaveQuestion(this.state.currQuestion, question.id)
            }
            className="card-edit-question-save"
          >
            Save
          </div>
        </div>
      </section>
    );
  }
}
export default EditQuestion;
