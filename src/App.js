import "./App.css";
import Keyboard from "./Keyboard";
import { useEffect, useState } from "react";

const TYPE_MAJOR = 1;
const TYPE_MINOR = 2;
const TYPE_DIM = 3;

const CHORDS = new Map([
  ["C", { type: TYPE_MAJOR }],
  ["Cm", { type: TYPE_MINOR }],
  ["Cdim", { type: TYPE_DIM }],
  ["D", { type: TYPE_MAJOR }],
  ["Dm", { type: TYPE_MINOR }],
  ["Ddim", { type: TYPE_DIM }],
  ["E", { type: TYPE_MAJOR }],
  ["Em", { type: TYPE_MINOR }],
  ["Edim", { type: TYPE_DIM }],
  ["F", { type: TYPE_MAJOR }],
  ["Fm", { type: TYPE_MINOR }],
  ["Fdim", { type: TYPE_DIM }],
  ["G", { type: TYPE_MAJOR }],
  ["Gm", { type: TYPE_MINOR }],
  ["Gdim", { type: TYPE_DIM }],
  ["A", { type: TYPE_MAJOR }],
  ["Am", { type: TYPE_MINOR }],
  ["Adim", { type: TYPE_DIM }],
  ["B", { type: TYPE_MAJOR }],
  ["Bm", { type: TYPE_MINOR }],
  ["Bdim", { type: TYPE_DIM }],
]);

const CHORD_STRS = [...CHORDS.keys()];

function App() {
  const [mode, setMode] = useState(0);
  const [choiceChord, setChoiceChord] = useState("");
  const [randomChord, setRandomChord] = useState("");
  const [frame, setFrame] = useState(0);
  const [isShowKeyboard, setShowKeyboard] = useState(true);
  const [isFilterMajor, setFilterMajor] = useState(true);
  const [isFilterMinor, setFilterMinor] = useState(true);
  const [isFilterDim, setFilterDim] = useState(false);
  const [isAutoRandom, setAutoRandom] = useState(false);
  const [autoPlaySec, setAutoPlaySec] = useState(5);

  const random_chords = [...CHORDS]
    .filter(([_, value]) => (isFilterMajor ? true : value.type !== TYPE_MAJOR))
    .filter(([_, value]) => (isFilterMinor ? true : value.type !== TYPE_MINOR))
    .filter(([_, value]) => (isFilterDim ? true : value.type !== TYPE_DIM))
    .map(([key, _]) => key);

  const changeRandromChord = () => {
    setRandomChord(
      random_chords[Math.floor(Math.random() * random_chords.length)]
    );
  };

  useEffect(() => {
    if (mode === "random" && isAutoRandom) {
      const timer = setTimeout(() => {
        changeRandromChord();
        setFrame(frame + 1);
      }, 1000 * Math.max(autoPlaySec, 1));
      return () => clearTimeout(timer);
    }
  }, [isAutoRandom, frame, autoPlaySec]);

  const ChoiceChordList = () => (
    <select
      size="4"
      value={choiceChord}
      defaultValue={choiceChord}
      onChange={(e) => setChoiceChord(e.target.value)}
    >
      <option value=""></option>
      {CHORD_STRS.map((c) => (
        <option value={c}>{c}</option>
      ))}
    </select>
  );

  const RandomButton = () => (
    <button onClick={(e) => changeRandromChord()}>ランダム</button>
  );

  const RandomProps = () => (
    <>
      <RandomButton />
      <p>
        <input
          type="checkbox"
          checked={isAutoRandom}
          onChange={(e) => setAutoRandom(e.target.checked)}
        />
        自動プレイ
        <input
          type="number"
          value={autoPlaySec}
          min={1}
          onChange={(e) => setAutoPlaySec(e.target.value)}
        />
      </p>
      <p>
        <input
          type="checkbox"
          checked={isFilterMajor}
          onChange={(e) => setFilterMajor(e.target.checked)}
        />
        Major
        <input
          type="checkbox"
          checked={isFilterMinor}
          onChange={(e) => setFilterMinor(e.target.checked)}
        />
        Minor
        <input
          type="checkbox"
          checked={isFilterDim}
          onChange={(e) => setFilterDim(e.target.checked)}
        />
        Dim
      </p>
    </>
  );

  const chord_str =
    mode === "choice" ? choiceChord : mode === "random" ? randomChord : "";

  return (
    <div className="App">
      <div>
        <div>
          <p>
            <input
              type="checkbox"
              checked={isShowKeyboard}
              onChange={(e) => setShowKeyboard(e.target.checked)}
            />
            キーボード表示
          </p>
          <select
            name="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="none">---</option>
            <option value="choice">コード選択</option>
            <option value="random">ランダム選択</option>
          </select>
        </div>
        {mode === "choice" ? (
          <ChoiceChordList />
        ) : mode === "random" ? (
          <RandomProps />
        ) : (
          <></>
        )}
      </div>
      <div id="chord">{chord_str}</div>
      <div>{isShowKeyboard ? <Keyboard chord={chord_str} /> : <></>}</div>
    </div>
  );
}

export default App;
