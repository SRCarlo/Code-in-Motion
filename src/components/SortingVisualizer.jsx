import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaStop,
  FaRedo,
  FaCode,
  FaInfoCircle,
  FaBolt,
  FaPython,
  FaJava,
  FaJsSquare,
  FaCuttlefish,
} from "react-icons/fa";

import bubbleSort from "../algorithms/sorting/bubbleSort";
import selectionSort from "../algorithms/sorting/selectionSort";
import insertionSort from "../algorithms/sorting/insertionSort";
import mergeSort from "../algorithms/sorting/mergeSort";
import quickSort from "../algorithms/sorting/quickSort";
import heapSort from "../algorithms/sorting/heapSort";

import { sortInfo } from "../data/sortInfo";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [language, setLanguage] = useState("c");
  const [sorting, setSorting] = useState(false);
  const stopRef = useRef(false);

  const languages = [
    { code: "c", icon: <FaCuttlefish className="text-blue-500 text-xl" /> },
    { code: "java", icon: <FaJava className="text-red-600 text-xl" /> },
    { code: "python", icon: <FaPython className="text-yellow-400 text-xl" /> },
    { code: "javascript", icon: <FaJsSquare className="text-yellow-300 text-xl" /> },
  ];

  useEffect(() => resetArray(), []);

  const resetArray = () => {
    const arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100));
    setArray(arr);
    setSorting(false);
    stopRef.current = false;
  };

  const getAlgorithm = () => {
    switch (algorithm) {
      case "bubble":
        return bubbleSort;
      case "selection":
        return selectionSort;
      case "insertion":
        return insertionSort;
      case "merge":
        return mergeSort;
      case "quick":
        return quickSort;
      case "heap":
        return heapSort;
      default:
        return bubbleSort;
    }
  };

  const handleSortToggle = async () => {
    if (sorting) {
      stopRef.current = true; // Stop the sorting
      return;
    }

    setSorting(true);
    stopRef.current = false;
    const algoFunc = getAlgorithm();
    const animations = algoFunc([...array]);

    for (let i = 0; i < animations.length; i++) {
      if (stopRef.current) break; // stop immediately
      setArray([...animations[i]]);
      await new Promise((res) => setTimeout(res, speed));
    }

    setSorting(false);
  };

  const info = sortInfo[algorithm];
  const codeSnippet = info.code[language];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Visualization */}
      <div className="md:w-2/3 bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBolt className="text-yellow-400" /> {info.name}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={resetArray}
              className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
            >
              <FaRedo /> Reset
            </button>
            <button
              onClick={handleSortToggle}
              className={`px-3 py-1 rounded flex items-center gap-1 ${
                sorting
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {sorting ? <><FaStop /> Stop</> : <><FaPlay /> Sort</>}
            </button>
          </div>
        </div>

        {/* Bars */}
        <div className="flex justify-center items-end h-64 space-x-1 mb-6">
          {array.map((value, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: value * 2 }}
              transition={{ duration: 0.2 }}
              className="w-3 md:w-4 bg-blue-500 rounded-sm"
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center flex-wrap gap-3 text-sm">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
          </select>

          <label className="flex items-center gap-2">
            Speed:
            <input
              type="range"
              min="20"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Right: Algorithm Details + Language Tabs */}
      <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaInfoCircle className="text-blue-400" /> {info.name}
        </h3>
        <p className="text-gray-300 text-sm mb-3">{info.description}</p>
        <p className="text-gray-400 text-sm mb-2">
          <strong>Time Complexity:</strong> {info.complexity}
        </p>

        <div className="flex items-center gap-2 mt-4 mb-2">
          <FaCode className="text-green-400" />
          <span className="font-semibold text-gray-300">
            Code (Select Language):
          </span>
        </div>

        {/* Language Tabs with icon-only + tooltip on hover */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {languages.map((lang) => (
            <div key={lang.code} className="relative group">
              <button
                onClick={() => setLanguage(lang.code)}
                className={`p-2 rounded flex items-center justify-center ${
                  language === lang.code
                    ? "bg-gray-900"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {lang.icon}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                {lang.code.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto text-green-400">
          {codeSnippet}
        </pre>
      </div>
    </div>
  );
}
