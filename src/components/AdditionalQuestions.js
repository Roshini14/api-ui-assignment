import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import EditQuestion from "./EditQuestion";
import Button from "./Button";
import { ReactComponent as Add } from "./../assets/ic_add.svg";
import { ReactComponent as Edit } from "./../assets/ic_edit.svg";

class AdditionalQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalQuestions: [],
    };
  }
  handleAddQuestion = () => {
    const question = {
      type: "",
      id: uuid(),
      question: "",
      choices: [""],
      maxChoice: 0,
      disqualify: false,
      others: false,
      openEdit: true,
      additionalInfo: "",
      maxDur: 0,
      timeUnit: null,
    };
    this.setState((prevState) => ({
      additionalQuestions: [...prevState.additionalQuestions, question],
    }));
  };
  componentDidMount() {
    this.props.handleChange(this.state.additionalQuestions);
  }
  handleRemoveQuestion = (id) => {
    this.setState((prevState) => ({
      additionalQuestions: prevState.additionalQuestions.filter(
        (question) => question.id != id
      ),
    }));
  };

  handleEditQuestion = (id) => {
    let dummyQuestions = this.state.additionalQuestions;
    dummyQuestions.forEach((question, index) => {
      if (question.id === id) {
        dummyQuestions[index] = {
          ...dummyQuestions[index],
          openEdit: true,
        };
      }
    });
    this.setState({
      additionalQuestions: dummyQuestions,
    });
  };

  handleSaveQuestion = (currQuestion, id) => {
    let dummyQuestions = this.state.additionalQuestions;
    dummyQuestions.forEach((question, index) => {
      if (question.id === id) {
        dummyQuestions[index] = {
          ...dummyQuestions[index],
          ...currQuestion,
          openEdit: false,
        };
      }
    });
    // debugger
    this.setState({
      additionalQuestions: dummyQuestions,
    });
  };

  render() {
    const { additionalQuestions } = this.state;
    return (
      <section className="card-section">
        <div className="card-header">{this.props.header}</div>
        <form className="card-form">
          {additionalQuestions.map((question, i) =>
            question.openEdit ? (
              <EditQuestion
                question={question}
                handleSaveQuestion={this.handleSaveQuestion}
                handleRemoveQuestion={this.handleRemoveQuestion}
              />
            ) : (
              <div className="card-additional-questions">
                <div className="card-question-type">{question.type}</div>
                <div className="card-question-name">
                  <div className="card-question-title">{question.question}</div>
                  <Edit onClick={() => this.handleEditQuestion(question.id)} />
                </div>
              </div>
            )
          )}
          <div
            className="card-add-question"
            type="button"
            style={{
              cursor: "pointer",
            }}
            onClick={this.handleAddQuestion}
          >
            <Add /> &nbsp; &nbsp; Add a question
          </div>
          {additionalQuestions.length > 0 && (
            <Button
              text="Save Data"
              onClick={() =>
                this.props.handleChange(this.state.additionalQuestions)
              }
            />
          )}
        </form>
      </section>
    );
  }
}

export default AdditionalQuestions;
