import React, { Component } from "react";
import Field from "./Field";
import EditQuestion from "./EditQuestion";
import Button from "./Button";
import { v4 as uuid } from "uuid";
import { ReactComponent as Add } from "./../assets/ic_add.svg";
import { ReactComponent as Edit } from "./../assets/ic_edit.svg";
import "./Card.css";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.info.firstName,
      lastName: props.info.lastName,
      emailId: props.info.emailId,
      nationality: props.info.nationality,
      phoneNumber: props.info.nationality,
      currentResidence: props.info.currentResidence,
      idNumber: props.info.idNumber,
      dateOfBirth: props.info.dateOfBirth,
      gender: props.info.gender,
      personalQuestions: props.info.personalQuestions || [],
    };
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        firstName: this.props.info.firstName,
        lastName: this.props.info.lastName,
        emailId: this.props.info.emailId,
        nationality: this.props.info.nationality,
        phoneNumber: this.props.info.nationality,
        currentResidence: this.props.info.currentResidence,
        idNumber: this.props.info.idNumber,
        dateOfBirth: this.props.info.dateOfBirth,
        gender: this.props.info.gender,
        personalQuestions: this.props.info.personalQuestions,
      });
    }
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
      personalQuestions: [...prevState.personalQuestions, question],
    }));
  };
  handleRemoveQuestion = (id) => {
    this.setState((prevState) => ({
      personalQuestions: prevState.personalQuestions.filter(
        (question) => question.id != id
      ),
    }));
  };

  handleEditQuestion = (id) => {
    let dummyQuestions = this.state.personalQuestions;
    dummyQuestions.forEach((question, index) => {
      if (question.id === id) {
        dummyQuestions[index] = {
          ...dummyQuestions[index],
          openEdit: true,
        };
      }
    });
    this.setState({
      personalQuestions: dummyQuestions,
    });
  };

  handleSaveQuestion = (currQuestion, id) => {
    let dummyQuestions = this.state.personalQuestions;
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
      personalQuestions: dummyQuestions,
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
      personalQuestions,
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
          {personalQuestions.map((question, i) =>
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
          <Button
            text="Save Data"
            onClick={() => this.props.handleChange(this.state)}
          />
        </form>
      </section>
    );
  }
}

export default PersonalInformation;
