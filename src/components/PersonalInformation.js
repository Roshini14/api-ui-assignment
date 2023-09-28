import React, { Component } from "react";
import Field from "./Field";
import EditQuestion from "./EditQuestion";
import Button from "./Button";
import { Input } from "antd";
import { v4 as uuid } from "uuid";
import { ReactComponent as Add } from "./../assets/ic_add.svg";
import { ReactComponent as Edit } from "./../assets/ic_edit.svg";
import "./Card.css";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        internalUse: false,
        show: true,
      },
      lastName: {
        internalUse: false,
        show: true,
      },
      emailId: {
        internalUse: false,
        show: true,
      },
      nationality: {
        internalUse: false,
        show: true,
      },
      phoneNumber: {
        internalUse: false,
        show: true,
      },
      currentResidence: {
        internalUse: false,
        show: true,
      },
      idNumber: {
        internalUse: false,
        show: true,
      },
      dateOfBirth: {
        internalUse: false,
        show: true,
      },
      gender: {
        internalUse: false,
        show: true,
      },
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
    this.props.handleChange(this.state);
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
    this.setState({
      additionalQuestions: dummyQuestions,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      emailId,
      nationality,
      phoneNumber,
      gender,
      dateOfBirth,
      currentResidence,
      idNumber,
      additionalQuestions,
    } = this.state;
    return (
      <section className="card-section">
        <div className="card-header">{this.props.header}</div>
        <form className="card-form">
          <div className="card-form-field">First Name</div>
          <div className="card-form-field">Last Name</div>
          <div className="card-form-field">Email</div>
          <Field
            entity={phoneNumber}
            placeholder={`Phone(without dial code)`}
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                phoneNumber: {
                  ...prevState.phoneNumber,
                  show: !prevState.phoneNumber.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                phoneNumber: {
                  ...prevState.phoneNumber,
                  internalUse: !prevState.phoneNumber.internalUse,
                },
              }));
            }}
          />
          <Field
            entity={nationality}
            placeholder="Nationality"
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                nationality: {
                  ...prevState.nationality,
                  show: !prevState.nationality.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                nationality: {
                  ...prevState.nationality,
                  internalUse: !prevState.nationality.internalUse,
                },
              }));
            }}
          />
          <Field
            entity={currentResidence}
            placeholder="Current Residence"
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                currentResidence: {
                  ...prevState.currentResidence,
                  show: !prevState.currentResidence.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                currentResidence: {
                  ...prevState.currentResidence,
                  internalUse: !prevState.currentResidence.internalUse,
                },
              }));
            }}
          />
          <Field
            entity={idNumber}
            placeholder="ID Number"
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                idNumber: {
                  ...prevState.idNumber,
                  show: !prevState.idNumber.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                idNumber: {
                  ...prevState.idNumber,
                  internalUse: !prevState.idNumber.internalUse,
                },
              }));
            }}
          />
          <Field
            entity={dateOfBirth}
            placeholder="Date of Birth"
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                dateOfBirth: {
                  ...prevState.dateOfBirth,
                  show: !prevState.dateOfBirth.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                dateOfBirth: {
                  ...prevState.dateOfBirth,
                  internalUse: !prevState.dateOfBirth.internalUse,
                },
              }));
            }}
          />
          <Field
            entity={gender}
            placeholder="Gender"
            internalKey="Internal"
            showKey="On"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                gender: {
                  ...prevState.gender,
                  show: !prevState.gender.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                gender: {
                  ...prevState.gender,
                  internalUse: !prevState.gender.internalUse,
                },
              }));
            }}
          />
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
          <Button text="Save Data" onClick={() => this.props.handleChange(this.state)} />
        </form>
      </section>
    );
  }
}

export default PersonalInformation;
