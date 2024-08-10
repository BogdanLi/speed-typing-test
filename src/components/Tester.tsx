import { useEffect, useRef, useState } from "react";
import ResultModal from "./ResultModal";
import { Box, Button } from "@mui/material";

const Tester = () => {
  // * State
  const [text, setText] = useState<string>(
    "test text to test"
  );
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [inputText, setInputText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false)
  const [result, setResult] = useState<string | null>(null)
  const [errors, setErrors] = useState<number>(0)

  // * Reference
  const inputRef = useRef<HTMLInputElement>(null);

  // * Effects
  useEffect(() => {
    if (inputText.length === 1 && !startTime) {
      setStartTime(Date.now())
    }

    if (inputText === text && !endTime) {
      setEndTime(Date.now())
    }
  }, [inputText, startTime, endTime, text])

  useEffect(() => {
    if (startTime && endTime) {
      const time = (endTime - startTime) / 1000

      const words = text.split(' ').length

      const wpm = Math.round((words / time) * 60)

      setResult(`Your result is ${wpm} WPM | errors ${errors}`)
      setShowResult(true)
    }
  }, [startTime, endTime, text, errors])

  const renderColorCodedText = () => {
    return text.split("").map((char, index) => {
      let color = "text-gray-400";
      if (index < inputText.length) {
        if (inputText[index] === char) {
          color = "text-green-500"
        } else {
          color = "text-red-500"
        }
      }
      return (
        <span key={index} className={`${color} text-2xl`}>
          {char}
        </span>
      );
    });
  };

  const handleTyping = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    setInputText(inputValue)

    if (text[inputValue.length - 1] !== inputValue[inputValue.length -1]) {
      setErrors((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setInputText('')
    setStartTime(null)
    setEndTime(null)
    setResult(null)
    inputRef.current?.focus()
  }

  return (
    <div className="relative bg-slate-600 text-slate-400 px-12 py-8 rounded-xl h-full lg:h-auto lg:min-w-2xl font-mono leading-7 text-xl">
      <div onClick={() => inputRef.current?.focus()}>
        {renderColorCodedText()}
      </div>
      <input
        onChange={handleTyping}
        value={inputText}
        ref={inputRef}
        type="text"
        name=""
        id=""
        className="opacity-0 absolute"
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 1, mt: 4}}>
        <Button variant="contained" onClick={handleReset}>Reset</Button>
        <Button variant="contained">Statistics</Button>
      </Box>
      <ResultModal open={showResult} onClose={() => setShowResult(false)} result={result} />
    </div>
  );
};

export default Tester;
