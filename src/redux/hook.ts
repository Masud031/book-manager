
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";

// export const useAppSelectore=useSelector.withTypes<Root>
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = () => useDispatch<AppDispatch>();