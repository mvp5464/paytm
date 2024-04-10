import { balanceAtom } from "@/store/atom/balance";
import { useRecoilValue } from "recoil";

export const useBalance = () => {
  const value = useRecoilValue(balanceAtom);
  return value;
};
