import { FaCodeBranch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-3 px-6 flex justify-center md:justify-between items-center shadow-md">
      <div className="flex items-center gap-2 text-xl font-semibold text-white">
        <FaCodeBranch className="text-blue-400" /> DSA Visualizer
      </div>
    </nav>
  );
}
