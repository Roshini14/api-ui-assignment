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
        personalInformation: {
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
        },
        profile: {
          education: {
            mandatory: false,
            show: true,
          },
          experience: {
            mandatory: false,
            show: true,
          },
          resume: {
            mandatory: false,
            show: true,
          },
          additionalQuestions: [],
        },
        customisedQuestions: [],
      },
    };
  }
  componentDidMount() {
    fetch(
      "http://127.0.0.1:4010/api/911.5737689691844/programs/expedita/application-form",
      {
        method: "GET",
        // body: JSON.stringify({ data: this.state }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          id: json.data.id,

          attributes: {
            coverImage: json.data.attributes.coverImage,
            personalInformation: json.data.attributes.personalInformation,
            profile: json.data.attributes.profile,
            customisedQuestions: json.data.attributes.customisedQuestions,
          },
        });
      });
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
    fetch(
      "http://127.0.0.1:4010/api/760.4486860403732/programs/velit/application-form",
      {
        method: "PUT",
        body: JSON.stringify({ data: this.state }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  };
  render() {
    const { attributes } = this.state;
    const { coverImage, personalInformation, profile, customisedQuestions } =
      attributes;
    return (
      <section>
        <UploadImage
          header="Upload Cover Image"
          handleChange={this.handleCoverImage}
          coverImage={coverImage}
        />
        <PersonalInformation
          header="Personal Information"
          handleChange={this.handlePersonalInformation}
          info={personalInformation}
        />
        <Profile
          header="Profile"
          handleChange={this.handleProfile}
          info={profile}
        />
        <AdditionalQuestions
          header="Additional Questions"
          handleChange={this.handleCustomisedQuestions}
          info={customisedQuestions}
        />
        <Button
          text="Submit"
          onClick={() => {
            this.api();
          }}
        />
      </section>
    );
  }
}

export default Body;
