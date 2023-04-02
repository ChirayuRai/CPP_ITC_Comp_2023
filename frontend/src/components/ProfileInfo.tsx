// ProfileSetup.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import internal from "stream";
import Select from "react-select";
import { GroupBase, OptionProps } from "react-select";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./profileinfo.css";

type HobbyOption = {
  value: string;
  label: string;
};

type MajorOption = {
  id: number;
  name: string;
};
// type HobbyGroup = GroupBase<HobbyOption> & {
//   options: HobbyOption[];
// };

interface FormData {
  username: string;
  name: string;
  biography: string;
  image: File | null;
  university: string;
  major: string;
  smoking: string;
  sleepTime: number;
  cleanliness: string;
  guests: string;
  pets: string;
  hobbies: string[];
}

interface University {
  name: string;
  country: string;
  city?: string;
  state?: string;
  web_pages?: string[];
}

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    # username
    email
    #firstName
    #vaccinated @client
  }
`;

const CREATE_PROFILE = gql`
  mutation CreateUserProfile($input: UserProfile!) {
    addUserProfile(input: $input) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();
  const [createProfile, newProfile] = useMutation(CREATE_PROFILE);
  const location = useLocation();
  const { stateUsername } = location.state;
  console.log("stateUsername", stateUsername);

  const [formData, setFormData] = useState<FormData>({
    username: stateUsername,
    name: "",
    biography: "",
    image: null,
    university: "",
    major: "",
    smoking: "",
    sleepTime: 0,
    cleanliness: "",
    guests: "",
    pets: "",
    hobbies: [],
  });
  console.log("form data Username", formData.username);

  const [majorsList, setMajors] = useState([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  // const hobbiesOptions = [
  //   { value: "reading", label: "Reading" },
  //   { value: "sports", label: "Sports" },
  //   { value: "music", label: "Music" },
  //   { value: "traveling", label: "Traveling" },
  //   { value: "cooking", label: "Cooking" },
  //   // Add more hobbies options here
  // ];
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 300, // Set the fixed width for the control
      color: "black",
    }),
    menu: (provided: any) => ({
      ...provided,
      width: 300, // Set the fixed width for the menu
    }),
    option: (provided: any) => ({
      ...provided,
      color: "black",
    }),
  };

  const hobbiesOptions: HobbyOption[] = [
    { value: "reading", label: "Reading" },
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "traveling", label: "Traveling" },
    { value: "cooking", label: "Cooking" },
    // Add more hobbies options here
  ];

  // const majorsOptions: MajorOption[] = [
  //   { value: "electrical engineering", label: "ee" },
  //   { value: "computer science", label: "cs" },
  //   { value: "physics", label: "physics" },
  //   { value: "math", label: "math" },
  //   { value: "statistics", label: "stats" },
  //   { value: "statistics", label: "stats" },
  //   // Add more hobbies options here
  // ];
  const majorsOptions: MajorOption[] = [
    { name: "Computer Science", id: 1 },
    { name: "Mechanical Engineering", id: 2 },
    { name: "Electrical Engineering", id: 3 },
    { name: "Civil Engineering", id: 4 },
    { name: "Physics", id: 5 },
    { name: "Mathematics", id: 6 },
  ];

  // const groupedHobbyOptions: HobbyGroup[] = [
  //   {
  //     label: "Hobbies",
  //     options: hobbiesOptions,
  //   },
  // ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    //handling boolean input
    // if (name === "pets" || name === "smoking") {
    //   const isTrue = value === "true";
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value === isTrue,
    //   }));
    // }
    console.log("name:", name, " ", "and value", value);
    console.log("form data", formData);
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbiesChange = (selectedOptions: any) => {
    if (selectedOptions.length > 3) {
      // If more than 3 options are selected, show a message or handle the situation as needed
      alert("You can only select up to 3 hobbies.");
      console.log("hobbies", formData.hobbies);
      return;
    } else {
      const selectedHobbies = selectedOptions.map(
        (option: any) => option.value
      );
      setFormData({ ...formData, hobbies: selectedHobbies });
      console.log("hobbies", formData.hobbies);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    // university: "",
    // major: "",
    // smoking: "",
    // sleepTime: 0,
    // cleanliness: "",
    // guests: "",
    // pets: "",
    // hobbies: [],
    try {
      const {
        username,
        name,
        biography,
        university,
        major,
        smoking,
        sleepTime,
        cleanliness,
        guests,
        pets,
        hobbies,
      } = formData; //destructuring the data to be passed as a req in createUser
      //graphql req: input payload
      const input = {
        username, //this value has to be passed in from the signup flow to establish the relationship
        name,
        biography,
        university,
        major,
        smoking,
        sleepTime,
        cleanliness,
        guests,
        pets,
        hobbies,
        //createdAt,
      };
      const response = await createProfile({
        variables: { input }, //the input has to match the input schema type defined in backend
      });
      console.log("API response:", response.data);
      console.log("API response:", newProfile);

      //navigate("/profile-setup"); navigate to either login page or home page
      // You can handle the response data here, e.g., show success message, redirect, etc.
    } catch (error) {
      console.error("API error:", error);
      // Handle the error, e.g., show error message, etc.
    }
    console.log("Form submitted:", formData);
    console.log("image", formData.image);
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch("https://your-api-url.com/majors");
        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          "http://universities.hipolabs.com/search?country=United States"
        );
        const universities = await response.json();
        setUniversities(universities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchMajors();
    fetchUniversities();
  }, [0]);

  return (
    <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg">
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <br />
      <div className="mb-4">
        <label className="block mb-1">
          Short Biography:
          <div>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </label>
      </div>
      {/* <label>
        Short Biography:
        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleChange}
        />
      </label> */}
      <br />
      <div>
        <label>
          Profile Image:
          <input type="file" onChange={handleImageUpload} />
        </label>
      </div>
      <br />
      <div>
        <label>Hobbies:</label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Select<HobbyOption, true>
            options={hobbiesOptions}
            isMulti
            onChange={handleHobbiesChange}
            placeholder="select upto 3 hobbies"
            maxMenuHeight={formData.hobbies.length < 3 ? 300 : 0} // Set maxMenuHeight to 0 to disable scrolling when 3 hobbies are selected
            value={hobbiesOptions.filter((option) =>
              formData.hobbies.includes(option.value)
            )}
            styles={customStyles}
          />
        </div>
      </div>
      <br />
      <div className="select-container">
        <label>University:</label>
        <div>
          <select
            name="university"
            value={formData.university}
            onChange={handleChange}
          >
            {/* Add university options here */}
            <option value="">Select a university</option>
            {universities.map((university) => (
              // <option key={university.country} value={university.name}>
              <option key={university.name} value={university.name}>
                {university.name}
              </option>
            ))}
            {/* <option value="university1">University 1</option>
          <option value="university2">University 2</option> */}
          </select>
        </div>
      </div>
      <br />
      <div>
        <label>
          Major:
          <div>
            <select name="major" value={formData.major} onChange={handleChange}>
              <option value="">Select a major</option>
              {majorsOptions.map((major) => (
                <option key={major.id} value={major.name}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>
      <br />
      <div>
        <label>
          Sleep Time:
          <select
            name="sleepTime"
            value={formData.sleepTime}
            onChange={handleChange}
          >
            <option value="">What's your sleep time?</option>
            <option value="1">Before 9pm</option>
            <option value="2">9pm - 11pm</option>
            <option value="3">11pm - 1am</option>
            <option value="4">1am - 3am</option>
            <option value="5">1am - 3am</option>
          </select>
        </label>
      </div>
      <br />
      <div>
        <label>
          How often do you clean?:
          <select
            name="cleanliness"
            value={formData.cleanliness}
            onChange={handleChange}
          >
            <option value="">select</option>
            <option value="OFTEN">often</option>
            <option value="SOMETIMES">sometimes</option>
            <option value="NEVER">never</option>
          </select>
        </label>
      </div>
      <br />
      <div>
        <label>
          How often do you have guests over?:
          <select name="guests" value={formData.guests} onChange={handleChange}>
            <option value="">select</option>
            <option value="OFTEN">often</option>
            <option value="SOMETIMES">sometimes</option>
            <option value="NEVER">never</option>
          </select>
        </label>
      </div>
      <br />
      <div>
        <label>
          Do you smoke?:
          <label>
            <input
              type="radio"
              name="smoking"
              value="yes"
              checked={formData.smoking === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="smoking"
              value="no"
              checked={formData.smoking === "no"}
              onChange={handleChange}
            />
            No
          </label>
        </label>
      </div>
      <br />
      <div>
        <label>
          Do you have pets?:
          <label>
            <input
              type="radio"
              name="pets"
              value="yes"
              checked={formData.pets === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="pets"
              value="no"
              checked={formData.pets === "no"}
              onChange={handleChange}
            />
            No
          </label>
        </label>
      </div>
      <br />
      <button
        type="submit"
        className="bg-blue-500 text-orange-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileInfo;
