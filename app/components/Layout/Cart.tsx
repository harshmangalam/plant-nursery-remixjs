import { ActionIcon, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoMdCart } from "react-icons/io";
import { Link } from "remix";

export default function Cart() {
  const cart =
    typeof window !== "undefined"
      ? localStorage.cart
        ? JSON.parse(localStorage.cart)
        : null
      : null;
  const [quantity, setQuantity] = useState(0);

  function fetchQuantity() {
    if (cart) {
      setQuantity(cart.totalPlants);
    }
  }
  useEffect(() => {
    fetchQuantity();
  }, [typeof window !== "undefined" && localStorage.cart]);
  return (
    <ActionIcon
      component={Link}
      to="/cart"
      variant="transparent"
      style={{ position: "relative" }}
    >
      <IoMdCart size={"20px"} />
      <Badge
        style={{
          position: "absolute",
          top: -14,
          right: -16,
        }}
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        {quantity}
      </Badge>
    </ActionIcon>
  );
}
