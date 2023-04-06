import backgroundPic from "../assets/thanatopsis.jpg";

export const About = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundPic})`,
      }}
    >
      Hello

    </div>
  );
}
