import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    GithubIcon,
    DribbbleIcon,
  } from "lucide-react";
  import logo from "../assets/mk-logo.png";
  
  const Footer = () => {
    return (
      <footer className="w-full bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-4">
            <img src={logo} alt="MK Creatives" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">Cashmirror - one stop solution for your expenses</h1>
              <p className="text-sm text-gray-400">Brought to you by MK Creatives</p>
            </div>
          </div>
  
          <div className="flex gap-5 items-center">
            <a href="https://www.facebook.com/profile.php?id=61572301925296" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="hover:text-blue-500 transition" />
            </a>
            <a href="https://www.instagram.com/mk_creative1019/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="hover:text-pink-500 transition" />
            </a>
            <a href="https://www.linkedin.com/in/mahanoor-khan/" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="hover:text-blue-400 transition" />
            </a>
            <a href="https://github.com/Mahanoor123" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="hover:text-gray-300 transition" />
            </a>
            <a href="https://dribbble.com/MK_creative1019" target="_blank" rel="noopener noreferrer">
              <DribbbleIcon className="hover:text-pink-400 transition" />
            </a>
          </div>
        </div>
  
        <div className="mt-12 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MK Creatives. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
