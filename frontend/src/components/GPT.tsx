import React, { useState } from "react";
import axios from "axios";
import "./gpt.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AiOutlineEye, AiOutlineAppstoreAdd } from "react-icons/ai";
//define the mutation query
import { AiOutlineDownload, AiOutlineSave } from "react-icons/ai";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineExpand,
  AiOutlineDribbbleSquare,
  AiOutlinePicture,
} from "react-icons/ai";
import { useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import AiOutlinePicture from "@ant-design/icons";

//get signedInUser prop

// const USER_DETAILS = gql`
//   fragment UserDetails on User {
//     username

//   }
// `;

//make sure the mutation exists in the backend
const GENERATE_IMAGES = gql`
  mutation GenerateDesigns($input: GenerateDesigns) {
    createDesigns(input: $input)
  }
`;

const SAVE_IMAGE = gql`
  mutation SaveDesign($input: SaveDesign) {
    saveUserDesign(input: $input)
  }
`;

const GET_DESIGNS = gql`
  mutation GetDesign($input: GetUserDesigns) {
    getUserDesigns(input: $input)
  }
`;

interface DallEProps {
  //for the state function to be passed from the home page
  loggedInUser: any;
  fScreenState: any;
  fullScreenBool: any;
}
const DALLEImageView: React.FC<DallEProps> = ({
  loggedInUser,
  fScreenState,
  fullScreenBool,
}) => {
  // const [isFullscreen, setIsFullscreen] = useState(false);

  const [userPrompt, setUserPrompt] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [collectionURLs, setCollectionURLs] = useState<any>([]);
  const [savedCollection, setSavedCollection] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [generateImages, generatedImages] = useMutation(GENERATE_IMAGES);
  const [getDesigns, userDesigns] = useMutation(GET_DESIGNS);
  const [saveImage, savedImages] = useMutation(SAVE_IMAGE);
  const [isViewingCollection, setIsViewingCollection] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const input = {
      prompt: userPrompt,
    };
    setSearchLoading(true);

    const { data } = await generateImages({
      variables: { input },
    }); //execute the mutation react hook
    console.log("response generated images:", data);
    setSearchLoading(false);
    setImageURLs(data.createDesigns);
    //setImageURLs(urls);
    //setImageURLs(urls);
  };

  //refactor this to execute the mutation query to save the selected image in mongodb
  const handleSaveImage = async (url: any) => {
    setSearchLoading(true);
    const input = {
      username: loggedInUser,
      imgSrc: url,
    };
    const { data } = await saveImage({
      variables: { input },
    }); //execute the mutation react hook
    console.log("response saved image:", data);
    setSearchLoading(false);
    //setImageURLs(data.createDesigns);
  };

  const handleLeftArrowClick = () => {
    setSearchLoading(false);
  };

  const refetchCollection = async () => {
    try {
      const input = {
        //this variable has to match the defined parameter accepted by the resolver
        username: loggedInUser,
      };
      console.log("username rec view", input);
      //execute the mutation query to return a list of recommended users for the logged in user
      setSearchLoading(true);
      let collection = await getDesigns({
        variables: { input }, //the input has to match the input schema type defined in backend
      });
      console.log("recommended list of users: ", collection);
      // setCollectionURLs(collection.data.getUserDesigns); //useState setter to set the returned recommendations
      const verifiedURLArr = await checkImage(collection.data.getUserDesigns);
      setCollectionURLs(verifiedURLArr);
      //setCollectionURLs(verifiedURLs);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching recommended users:", error);
    }
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const input = {
          //this variable has to match the defined parameter accepted by the resolver
          username: loggedInUser,
        };
        console.log("username rec view", input);
        //execute the mutation query to return a list of recommended users for the logged in user
        setSearchLoading(true);
        let collection = await getDesigns({
          variables: { input }, //the input has to match the input schema type defined in backend
        });
        console.log("recommended list of users: ", collection);

        const verifiedURLArr = await checkImage(collection.data.getUserDesigns);
        setCollectionURLs(verifiedURLArr);
        // setCollectionURLs(collection.data.getUserDesigns); //useState setter to set the returned recommendations
        setSearchLoading(false);
      } catch (error) {
        console.error("Error fetching recommended users:", error);
      }
    };
    fetchCollection();
  }, []);

  const downloadImage = (url: any) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = "generated-image.jpg";
    link.click();
  };

  // const checkImage = async () => {
  //   const verifiedUrls = collectionURLs.map((url) => {
  //     const img = new Image();
  //     img.src = url;
  //     img.onload = () => {
  //       return url;
  //     };
  //     img.onerror = () => {
  //       console.error("Invalid image URL:", url);
  //     };
  //   });
  //   return verifiedUrls;
  // };
  const checkImage = async (urls: any) => {
    const urlPromises = urls.map(
      (url: any) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            resolve(url);
          };
          img.onerror = () => {
            console.error("Invalid image URL:", url);
            resolve(null);
          };
        })
    );

    const verifiedUrls = await Promise.all(urlPromises);
    return verifiedUrls.filter((url) => url !== null);
  };

  async function openWithSquoosh(url: any, filename: any) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = "generated-image.jpg";
    link.click();
    const squooshUrl = `https://squoosh.app/?src=${encodeURIComponent(url)}`;
    window.open(squooshUrl, "_blank");
  }

  return (
    <div
      className="dalle-image-view "
      style={{
        maxHeight: fullScreenBool ? "515px" : "345px",
        overflowY: "auto",
      }}
    >
      <div
        className="fullscreen-icon-container"
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        {fullScreenBool ? (
          <AiOutlineFullscreenExit
            size={34}
            onClick={() => fScreenState(false)}
            style={{ cursor: "pointer" }}
            className="text-white"
          />
        ) : (
          <AiOutlineFullscreen
            size={34}
            onClick={() => fScreenState(true)}
            style={{ cursor: "pointer" }}
            className="text-white"
          />
        )}
      </div>

      {searchLoading ? (
        <div
          className="flex justify-center items-center"
          style={{
            height: "135px",
            // overflowY: "auto",
          }}
        >
          <button
            className="absolute top-0 left-0 m-4"
            onClick={handleLeftArrowClick}
            style={{ color: "white" }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="glame"></div>
        </div>
      ) : isViewingCollection ? (
        <>
          <p
            className="text font-semibold mb-8 text-center text-white opacity-80"
            style={{
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.05em",
              fontSize: "20px",
              textShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
            }}
          >
            Your Collection:
          </p>
          <button
            onClick={() => {
              setIsViewingCollection(!isViewingCollection);
            }}
            className="opacity-60 view-collection-button mt-1"
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isViewingCollection ? (
              "Create"
            ) : (
              <>
                <AiOutlineEye />
                {/* <span style={{ marginLeft: "8px" }}>View Collection</span> */}
              </>
            )}
          </button>
          <div
            className="image-grid mt-20"
            style={{ maxHeight: "420px", overflowY: "auto" }}
          >
            {/* Render your collection view here */}
            <div className="image-grid mt-20">
              {collectionURLs.map((url: any, index: any) => (
                // checkImage(url);
                <div
                  style={{
                    border: "3px solid #e0e0e0",
                    display: "inline-block",
                    borderRadius: "10px",
                    padding: "5px",
                    boxSizing: "border-box",
                  }}
                >
                  <div key={index} className="images-container relative">
                    <AiOutlinePicture
                      className="squoosh-icon absolute "
                      size={34}
                      onClick={() => openWithSquoosh(url, "squoosh-dalle.png")}
                      style={{
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        cursor: "pointer",
                      }}
                      title={"Open with squoosh"}
                    />
                    <img src={url} className="rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <p
              className="text font-semibold mb-8 text-center text-white opacity-70"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "20px",
                letterSpacing: "0.05em",
                textShadow:
                  "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
              }}
            >
              {isViewingCollection
                ? "View Collection"
                : "Create Living Space Designs:"}
            </p>
            <div>
              <button
                onClick={() => {
                  refetchCollection();
                  setIsViewingCollection(!isViewingCollection);
                }}
                className="opacity-60 view-collection-button  mb-2"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {isViewingCollection ? (
                  "Create"
                ) : (
                  <>
                    <div className="">
                      <AiOutlineEye />
                    </div>
                    {/* <span style={{ marginLeft: "8px" }}>View Collection</span> */}
                  </>
                )}
              </button>
            </div>
            {/* <input
              type="text"
              id="prompt-input"
              className="form-input mb-4 mt-6 opacity-70 "
              placeholder="enter your API key"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
            /> */}
            <input
              type="text"
              id="prompt-input"
              className="form-input mb-4 mt-6 opacity-70 "
              placeholder="ex: rainforest themed living room"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="opacity-61 submit-button mt-1"
            // style={{ width: "30%", marginLeft: "auto", marginRight: "auto" }}
          >
            Generate
          </button>

          <div className="image-grid mt-20">
            {imageURLs.map((url, index) => (
              <>
                <div key={index} className="images-container relative">
                  <div>
                    <AiOutlineSave
                      className="save-icon absolute"
                      size={34}
                      onClick={() => handleSaveImage(url)}
                      style={{ top: "10px", left: "10px", cursor: "pointer" }}
                      title={"Save to collection"}
                    />
                    <AiOutlinePicture
                      className="squoosh-icon absolute "
                      size={34}
                      onClick={() => openWithSquoosh(url, "squoosh-dalle.png")}
                      style={{
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        cursor: "pointer",
                      }}
                      title={"Open with squoosh"}
                    />
                    <AiOutlineExpand
                      className="download-icon"
                      size={34}
                      onClick={() => downloadImage(url)}
                      title={"Open in new tab"}
                    />
                  </div>
                  <div
                    style={{
                      border: "3px solid #e0e0e0",
                      display: "inline-block",
                      borderRadius: "10px",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={url}
                      // alt="Generated Room"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DALLEImageView;
