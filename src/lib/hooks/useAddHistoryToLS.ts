import { HistoryState} from "../types/historySlice.types";

const useAddHistoryToLS = () => {
  const addResult = (result: HistoryState) => localStorage.setItem("history", JSON.stringify(result))

  return addResult
}

export default useAddHistoryToLS
