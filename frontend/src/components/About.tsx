import backgroundPic from "../assets/thanatopsis.jpg";


const About = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundPic})`,
      }}
    >
      <div className="bg-blue-400 p-8 bg-opacity-30 rounded-lg shadow-md w-full max-w-2xl mx-auto border-4 border-black">
        <h2
          className="text-4xl font-semibold mb-4 text-center text-white"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          About the Project
        </h2>
        <p
          className="text-left text-white font-bold text-2xl"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          Credits:
        </p>
        <p
          className="text-left text-white font-medium text-m"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >Amogh Prakash, Chirayu Rai, Gerardo Solis, Andy Diep, Sara Cozart</p>
        <br />
        <p
          className="text-left text-white font-bold text-2xl"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          Our Tech Stack:
        </p>
        <p
          className="text-left text-white font-medium text-m"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          This project is based off the MERN stack, but we have also added a layer of graphql for easier querying, as well as redis for caching user recommendations. The recommendation system also utilizes tensor flow, allowing for more accurate pairing between users.
        </p>
        <br />
        <p
          className="text-white font-bold text-2xl "
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0.05em",
            textShadow:
              "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          A <a
            className="underline hover:text-slate-300 visited:text-slate-500"
            href="https://www.notion.so/ITC-Comp-b4d08e53ca72495da9999d2753a419a7?pvs=4"
            target="_blank" >link</a> to our documentation
        </p>
      </div>
    </div>
  );
}

export default About;
