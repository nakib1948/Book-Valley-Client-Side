import { Link } from "react-router-dom";
import "./secondsection.css";

const Secondsection = () => {
  return (
   
      <div className="grid sm:grid-cols-1 m-10 md:h-96 lg:h-96 sm:h-[500px] md:grid-cols-2 gap-6">
        <div
          className="hero zooming-background" // Add a new class for the background animation
          style={{
            backgroundImage: "url(https://i.ibb.co/P6SBH0s/fiction-1.jpg)",
            animation: "zoomInOut 10s infinite alternate", // Apply the animation here
          }}
        >
          <div className="hero-overlay bg-opacity-30"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <p className="mb-5 font-semibold">LATEST BESTSELLING</p>
              <h1 className="mb-5 text-5xl font-bold">Crime Fiction Books</h1>
              <Link to={`/subcategories/FICTION`}> <button className="btn rounded-full bg-deepblue text-white">Shop now</button></Link>
             
            </div>
          </div>
        </div>

        <div
          className="hero zooming-background" // Add a new class for the background animation
          style={{
            backgroundImage: "url(https://i.ibb.co/s1Hz2NX/war.jpg)",
            animation: "zoomInOut 4s infinite alternate", // Apply the animation here
          }}
        >
          <div className="hero-overlay bg-opacity-30"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <p className="mb-5 font-semibold">GET TO KNOW</p>
              <h1 className="mb-5 text-5xl font-bold">World war Heroes</h1>
              <Link to={`/subcategories/WAR`}><button className="btn rounded-full bg-deepblue text-white">Shop now</button></Link>
              
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Secondsection;
