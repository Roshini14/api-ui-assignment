import React, { Component } from "react";
import Field from "./Field";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import EditQuestion from "./EditQuestion";
import { ReactComponent as Add } from "./../assets/ic_add.svg";
import { ReactComponent as Edit } from "./../assets/ic_edit.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: props.info.education,
      experience: props.info.experience,
      resume: props.info.resume,
      profileQuestions: props.info.profileQuestions || [],
    };
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        education: this.props.info.education,
        experience: this.props.info.experience,
        resume: this.props.info.resume,
        profileQuestions: this.props.info.profileQuestions || [],
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
      profileQuestions: [...prevState.profileQuestions, question],
    }));
  };

  handleRemoveQuestion = (id) => {
    this.setState((prevState) => ({
      profileQuestions: prevState.profileQuestions.filter(
        (question) => question.id != id
      ),
    }));
  };

  handleEditQuestion = (id) => {
    let dummyQuestions = this.state.profileQuestions;
    dummyQuestions.forEach((question, index) => {
      if (question.id === id) {
        dummyQuestions[index] = {
          ...dummyQuestions[index],
          openEdit: true,
        };
      }
    });
    this.setState({
      profileQuestions: dummyQuestions,
    });
  };

  handleSaveQuestion = (currQuestion, id) => {
    let dummyQuestions = this.state.profileQuestions;
    dummyQuestions.forEach((question, index) => {
      if (question.id === id) {
        dummyQuestions[index] = {
          ...dummyQuestions[index],
          ...currQuestion,
          openEdit: false,
        };
      }
    });
    this.setState(
      {
        profileQuestions: dummyQuestions,
      },
      () => this.props.handleChange(this.state)
    );
  };
  render() {
    const { education, experience, resume, profileQuestions } = this.state;
    return (
      <section className="card-section">
        <div className="card-header">{this.props.header}</div>
        <form className="card-form">
          <Field
            entity={education}
            placeholder="Education"
            internalKey="Mandatory"
            showKey="Show"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                education: {
                  ...prevState.education,
                  show: !prevState.education.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                education: {
                  ...prevState.education,
                  mandatory: !prevState.education.mandatory,
                },
              }));
            }}
          />
          <Field
            entity={experience}
            placeholder="Experience"
            internalKey="Mandatory"
            showKey="Show"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                experience: {
                  ...prevState.experience,
                  show: !prevState.experience.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                experience: {
                  ...prevState.experience,
                  mandatory: !prevState.experience.mandatory,
                },
              }));
            }}
          />
          <Field
            entity={resume}
            placeholder="Resume"
            internalKey="Mandatory"
            showKey="Show"
            hideKey="Hide"
            handleHideChange={() => {
              this.setState((prevState) => ({
                resume: {
                  ...prevState.resume,
                  show: !prevState.resume.show,
                },
              }));
            }}
            handleInternalChange={() => {
              this.setState((prevState) => ({
                resume: {
                  ...prevState.resume,
                  mandatory: !prevState.resume.mandatory,
                },
              }));
            }}
          />
          {profileQuestions.map((question, i) =>
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

export default Profile;
