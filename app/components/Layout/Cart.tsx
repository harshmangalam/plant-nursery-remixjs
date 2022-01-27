import { ActionIcon, Badge } from "@mantine/core";
import { IoMdCart } from "react-icons/io";
import { Link } from "remix";
export default function Cart() {
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
        3
      </Badge>
    </ActionIcon>
  );
}
