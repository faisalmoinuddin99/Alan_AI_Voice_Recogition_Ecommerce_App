import { useCallback, useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useCart } from "../context/CartContext";

const COMMANDS = {
  OPEN_CART: "open-cart",
};

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();
  const { setShowCartItems, isCartEmpty } = useCart();

  const openCart = useCallback(() => {
    if (isCartEmpty) {
      alanInstance.playText(
        "faisal sir! apka cart empty hai, please kuch item purchase kijye."
      );
    } else {
      alanInstance.playText(
        "jee malik faisal sir!  maine, right hand side, mai khool diya hai"
      );
      setShowCartItems(true);
    }
  }, [alanInstance, setShowCartItems, isCartEmpty]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
    };
  }, [openCart]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        top: "15px",
        left: "15px",
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command }) => {
          window.dispatchEvent(new CustomEvent(command));
        },
      })
    );
  }, []);
  return null;
}
