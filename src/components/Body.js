import { Component } from "react";
import UploadImage from "./UploadImage";
import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import { v4 as uuid } from "uuid";
import AdditionalQuestions from "./AdditionalQuestions";
import Button from "./Button";
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      type: "applicationForm",
      attributes: {
        coverImage: {},
        personalInformation: {},
        profile: {},
        customisedQuestions: [],
      },
    };
  }
  handleCoverImage = (data) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        coverImage: data,
      },
    }));
  };
  handlePersonalInformation = (data) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        personalInformation: data,
      },
    }));
  };
  handleProfile = (data) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        profile: data,
      },
    }));
  };
  handleCustomisedQuestions = (data) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        customisedQuestions: data,
      },
    }));
  };
  api = () => {
    console.log(this.state);
    fetch(
      " http://127.0.0.1:4010/api/802.1997072307399/programs/ducimus/application-form",
      {
        method: "PUT",
        body: JSON.stringify({ data: this.state }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
  };
  render() {
    return (
      <section>
        <UploadImage
          header="Upload Cover Image"
          handleChange={this.handleCoverImage}
        />
        <PersonalInformation
          header="Personal Information"
          handleChange={this.handlePersonalInformation}
        />
        <Profile header="Profile" handleChange={this.handleProfile} />
        <AdditionalQuestions
          header="Additional Questions"
          handleChange={this.handleCustomisedQuestions}
        />
        <Button
          text="Submit"
          onClick={() => {
            console.log("api");
            this.api();
          }}
        />
      </section>
    );
  }
}

export default Body;
