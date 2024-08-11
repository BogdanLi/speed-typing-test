import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [text] = useState<string>("test text to test");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [errors, setErrors] = useState<number>(0);

  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.history);

  const addToLS = useAddHistoryToLS();

  // * Reference
  const inputRef = useRef<HTMLInputElement>(null);

  // * Effects
  // * Starting and ending time
  useEffect(() => {
    if (inputText.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (inputText === text && !endTime) {
      setEndTime(Date.now());
    }
  }, [inputText, startTime, endTime, text]);

  useEffect(() => {
    addToLS(history);
  }, [history, addToLS]);

  // * Render text depending on error or not
  const renderedText = useMemo(() => {
    return text.split("").map((char, index) => {
      let color = "text-gray-400";
      if (index < inputText.length) {
        color = inputText[index] === char ? "text-gray-300" : "text-red-500";
      }
      return (
        <span key={index} className={`${color} text-4xl`}>
          {char}
        </span>
      );
    });
  }, [text, inputText]);

  // * Checking for errors
  const handleTyping = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value;
      setInputText(inputValue);

      if (text[inputValue.length - 1] !== inputValue[inputValue.length - 1]) {
        setErrors((prev) => prev + 1);
      }
    },
    [text]
  );

  const handleReset = useCallback(() => {
    setInputText("");
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    inputRef.current?.focus();
  }, []);

  // * Counting wpm
  const result = useMemo(() => {
    if (startTime && endTime) {
      const time = (endTime - startTime) / 1000;
      const words = text.split(" ").length;

      const wpm = Math.round((words / time) * 60);

      const submit: TestResult = {
        wpm,
        errors,
      };

      dispatch(addResult(submit));

      setShowResult(true);

      return wpm;
    }
    return 0;
  }, [dispatch, startTime, endTime, text, errors]);

  return (
    <div className="relative text-slate-400 px-12 py-8 rounded-xl h-auto lg:min-w-2xl font-mono leading-7 text-xl">
      <div onClick={() => inputRef.current?.focus()}>{renderedText}</div>
      <input
        onChange={handleTyping}
        value={inputText}
        ref={inputRef}
        type="text"
        className="opacity-0 absolute"
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: 1,
          mt: 4,
        }}
      >
        <Button disabled={!startTime} variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" onClick={() => setShowStats(true)}>
          Statistics
        </Button>
      </Box>
      <ResultModal
        open={showResult}
        onClose={() => setShowResult(false)}
        wpm={result}
        errors={errors}
      />
      <StatsModal open={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
};

export default Tester;
