import React, { useState } from "react";

//setting type

// interface SearchAttributes {
//   Hygiene: string;
//   Pets: string;
//   Smoking: string;
//   Guests: string;
//   SleepTime: string;
// }

// const booleanAttributeKeys = ["Pets", "Smoking"] as const;

// const stringAttributeKeys = [
//   "SleepTime",
//   "Hygiene",
//   "University",
//   "Guests",
// ] as const;

// interface SearchAttributes {
//   [key in booleanAttributeKeys]: boolean ;
// }

interface SearchFilterProps {
  //for the state function to be passed from the home page
  onSearchAttributesChange: (attributes: any) => void;
  onToggleView: () => void;
  signedInUser: any;
}

//const SearchFilter: React.FC<SearchFilterProps> = ({
const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearchAttributesChange,
  onToggleView,
  signedInUser,
}) => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [filterAttributes, setFilterAttributes] = useState({
    Hygiene: "",
    Pets: "",
    Smoking: "",
    Guests: "",
    SleepTime: "",
    Personality: "",
    University: false,
  });

  // const sleepTimes = ["Before 9 PM", "9-11 PM", "11 PM - 1 AM", "1-3 AM"];
  // const frequency = ["OFTEN", "SOMETIMES", "NEVER"];

  // const handleSearchChange = (e: any) => {
  //   setSearchTerm(e.target.value);
  // };

  const [collapsed, setCollapsed] = useState(true);

  const handleCheckboxAttributeChange = (e: any) => {
    setFilterAttributes({
      ...filterAttributes,
      [e.target.name]: e.target.checked, //set the user's university if checked
    });
  };

  const handleAttributeChange = (e: any) => {
    setFilterAttributes({
      ...filterAttributes,
      [e.target.name]: e.target.value,
    });
    console.log("");
  };

  const handleSearchClick = () => {
    // console.log("Search Term:", searchTerm);
    console.log("Filter Attributes:", filterAttributes);
    onSearchAttributesChange(filterAttributes); //executing the function passed in as prop from Home page
    onToggleView();
  };

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  //const [preferences, setPreferences] = useState(initialPreferences);

  return (
    <div className="flex flex-col h-full ">
      <div className="justify-between items-center mb-8">
        <h3 className="text-xl font-semibold mb-4">Search</h3>
      </div>

      <hr className="border-t border-black mb-8" />
      <div
        className="flex flex-col h-full"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <div className="flex justify-center">
          <div className="filter-attributes space-y-4 flex-1 overflow-y-auto max-w-lg">
            {/* <h4 className="font-semibold mb-4 text-center">Preferences:</h4> */}
            <div className="w-1/2 pr-8">
              <label htmlFor="university" className="font-italic mb-2">
                Match University
              </label>
              <input
                type="checkbox"
                checked={filterAttributes.University}
                onChange={handleCheckboxAttributeChange}
                id="university"
                name="University"
                className="ml-2 align-middle"
              />
            </div>
            <br />
            <hr className="border-t border-black mb-8" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <label htmlFor="pets" className="font-semibold mb-2">
                  Pets:
                </label>
                <select
                  id="pets"
                  name="Pets"
                  value={filterAttributes.Pets}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="yes">yea</option>
                  <option value="no">nay</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="smoke" className="font-semibold mb-2">
                  Smoke:
                </label>
                <select
                  id="smoke"
                  name="Smoking"
                  value={filterAttributes.Smoking}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="yes">yea</option>
                  <option value="no">nay</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold mb-2">Sleep time:</h4>
                <select
                  name="SleepTime"
                  value={filterAttributes.SleepTime}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="1">Before 9pm</option>
                  <option value="2">9pm - 11pm</option>
                  <option value="3">11pm - 1am</option>
                  <option value="4">1am - 3am</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold mb-2">Hygiene:</h4>
                <select
                  name="Hygiene"
                  value={filterAttributes.Hygiene}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="OFTEN">often</option>
                  <option value="SOMETIMES">sometimes</option>
                  <option value="NEVER">never</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold mb-2">Guests:</h4>
                <select
                  name="Guests"
                  value={filterAttributes.Guests}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="OFTEN">often</option>
                  <option value="SOMETIMES">sometimes</option>
                  <option value="NEVER">never</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold mb-2">Personality:</h4>
                <select
                  name="Personality"
                  value={filterAttributes.Personality}
                  onChange={handleAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-xs"
                >
                  <option value=""></option>
                  <option value="introvert">introvert</option>
                  <option value="extrovert">extrovert</option>
                  <option value="ambivert">ambivert</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Show Results
          </button>
        </div>
      </div>

      <br />
      {/* <div>
        <button
          onClick={handleSearchClick}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Show results
        </button>
      </div> */}
    </div>
  );
};

export default SearchFilter;
