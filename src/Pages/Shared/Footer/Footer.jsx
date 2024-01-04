import footerImg from "../../../assets/book-icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="footer p-5 text-base bg-[#361f53]  text-white">
        <div className="justify-items-center">
          <img className="h-24 rounded-full bg-white" src={footerImg} alt="" />
          <p className="text-center">
            {" "}
            <span className="text-blue-600 text-xl">Book Valley</span>
            <br /> Exploring Recipes since 2012
          </p>
        </div>

        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Our Service</a>
          <a className="link link-hover">Gallery</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <span className="footer-title">Contact Us</span>

          <div className="flex">
            <FontAwesomeIcon
              className="mb-3 mr-4"
              icon={faPhone}
              beatFade
              size="xl"
            />
            <p className="text-orange-500">+4420 9994 7740</p>
          </div>
          <div className="flex">
            <FontAwesomeIcon
              className="mb-3 mr-4"
              icon={faEnvelope}
              beatFade
              size="xl"
            />
            <p className="text-orange-500">bookvalley@gmail.com</p>
          </div>
          <div className="flex">
            <FontAwesomeIcon
              className="mb-3 mr-4"
              icon={faMapMarkerAlt}
              beatFade
              size="xl"
            />
            <p className="text-orange-500">
            123 Main Street level-4,buliding-9,Dhaka
            </p>
          </div>

          <div className="w-full h-0.5 bg-gray-300 my-4"></div>
          <div>
            <FontAwesomeIcon icon={faFacebook} beat size="2xl" />
            <FontAwesomeIcon
              className="mx-4"
              icon={faTwitter}
              beat
              size="2xl"
            />
            <FontAwesomeIcon icon={faInstagram} beat size="2xl" />
          </div>
        </div>
      </footer>

      <footer className="footer footer-center p-4 bg-[#361f53] text-white">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Book
            Valley
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
