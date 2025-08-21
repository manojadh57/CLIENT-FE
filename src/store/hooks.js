import { useDispatch, useSelector } from "react-redux";

// These can be further typed in TS, but for JS this is enough
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
