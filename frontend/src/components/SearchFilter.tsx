import React, { useState } from "react";

//setting type

interface SearchAttributes {
  Hygiene: string;
  Pets: boolean;
  Smoking: boolean;
  Guests: string;
  SleepTime: string;
  University: string;
}

const booleanAttributeKeys = ["Pets", "Smoking"] as const;

const stringAttributeKeys = [
  "SleepTime",
  "Hygiene",
  "University",
  "Guests",
] as const;

// interface SearchAttributes {
//   [key in booleanAttributeKeys]: boolean ;
// }

interface SearchFilterProps {
  //for the state function to be passed from the home page
  onSearchAttributesChange: (attributes: SearchAttributes) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearchAttributesChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttributes, setFilterAttributes] = useState({
    Hygiene: "",
    Pets: false,
    Smoking: false,
    Guests: "",
    SleepTime: "",
    University: "",
  });

  // const preferences = [
  //   "Hygiene",
  //   "Pets",
  //   "Smoking",
  //   "Guests",
  //   "SleepTime",
  //   "University",
  // ];

  const sleepTimes = [
    "Early (9-10 PM)",
    "Midnight (11 PM-12 AM)",
    "Late (1-2 AM)",
  ];
  const frequency = ["OFTEN", "SOMETIMES", "NEVER"];

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const [collapsed, setCollapsed] = useState(true);

  const handleAttributeChange = (e: any) => {
    setFilterAttributes({
      ...filterAttributes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSearchClick = () => {
    console.log("Search Term:", searchTerm);
    console.log("Filter Attributes:", filterAttributes);
    onSearchAttributesChange(filterAttributes);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //const [preferences, setPreferences] = useState(initialPreferences);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold mb-4">Filter by:</h3>
      </div>
      <div className="filter-attributes space-y-2 flex-1 overflow-y-auto">
        <div>
          <h4 className="font-semibold mb-2">Preferences:</h4>
          <div className="space-y-2">
            {booleanAttributeKeys.map((pref) => (
              <label key={pref} className="flex items-center">
                <input
                  type="checkbox"
                  name={pref}
                  checked={filterAttributes[pref]}
                  onChange={handleAttributeChange}
                  className="mr-2"
                />
                {pref}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Sleep time:</h4>
          <select
            name="SleepTime"
            value={filterAttributes.SleepTime}
            onChange={handleAttributeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {sleepTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Hygiene:</h4>
          <select
            name="Hygiene"
            value={filterAttributes.Hygiene}
            onChange={handleAttributeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {frequency.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Guests:</h4>
          <select
            name="Guests"
            value={filterAttributes.Guests}
            onChange={handleAttributeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {frequency.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div>
        <button
          onClick={handleSearchClick}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
