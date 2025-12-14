import { FaLaptopCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10 border-t border-gray-700">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base">
        {/* Developer text with icon and GitHub link */}
        <span className="flex items-center gap-1">
          <FaLaptopCode className="text-cyan-400" /> Developed by{" "}
          <a
            href="https://github.com/SRCarlo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-cyan-400 transition-colors"
          >
            Naoe
          </a>{" "}
          ❤️
        </span>
      </div>
    </footer>
  );
}
