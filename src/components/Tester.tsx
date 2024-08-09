import { useRef, useState } from "react";

const Tester = () => {
  const [text, setText] = useState<string>(
    "determine human trunk small thirty consider us although calm eat gone own speed press soap flag potatoes adult discover lay being kept slightly meal"
  );
  const [inputText, setInputText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const renderColorCodedText = () => {
    return text.split("").map((char, index) => {
      let color = "text-gray-400";
      if (index < inputText.length) {
        color = inputText[index] === char ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={index} className={`${color} text-2xl`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="relative bg-slate-600 text-slate-400 px-12 py-8 rounded-xl h-full lg:h-auto lg:max-w-2xl font-mono leading-7 text-xl">
      <div onClick={() => inputRef.current?.focus()}>
        {renderColorCodedText()}
      </div>
      <input
        onChange={(event) => setInputText(event.target.value)}
        ref={inputRef}
        type="text"
        name=""
        id=""
        className="opacity-0 absolute"
      />
    </div>
  );
};

export default Tester;
