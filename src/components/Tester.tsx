import { useEffect, useRef, useState } from "react";
import ResultModal from "./ResultModal";
import { Box, Button } from "@mui/material";
import StatsModal from "./StatsModal";
import { useDispatch, useSelector } from "react-redux";
import { TestResult } from "../lib/types/historySlice.types";
import { addResult } from "../lib/state/slices/historySlice";
import { RootState } from "../lib/state/Store";
import useAddHistoryToLS from "../lib/hooks/useAddHistoryToLS";

const Tester = () => {
  // * State
  const [text, setText] = useState<string>(
    "test text to test"
  );
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [inputText, setInputText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false)
  const [showStats, setShowStats] = useState<boolean>(false)
  const [result, setResult] = useState<number>(0)
  const [errors, setErrors] = useState<number>(0)

  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.history)

  const addToLS = useAddHistoryToLS()

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

      setResult(wpm)
      setShowResult(true)

      const submit: TestResult = {
        wpm,
        errors
      }

      dispatch(addResult(submit))
    }
  }, [startTime, endTime, text, errors])

  useEffect(() => {
    addToLS(history)
  }, [history, addToLS])

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
        <span key={index} className={`${color} text-4xl`}>
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
    setResult(0)
    setErrors(0)
    inputRef.current?.focus()
  }

  return (
    <div className="relative text-slate-400 px-12 py-8 rounded-xl h-auto lg:min-w-2xl font-mono leading-7 text-xl">
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
        <Button disabled={!startTime} variant="contained" onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={() => setShowStats(true)}>Statistics</Button>
      </Box>
      <ResultModal open={showResult} onClose={() => setShowResult(false)} wpm={result} errors={errors} />
      <StatsModal open={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
};

export default Tester;
