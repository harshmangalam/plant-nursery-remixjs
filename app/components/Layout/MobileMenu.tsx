import { Menu, ActionIcon, MediaQuery } from "@mantine/core";
import { AiOutlineHome } from "react-icons/ai";
import { BsCollection } from "react-icons/bs";
import { RiPlantLine } from "react-icons/ri";
import { IoApps } from "react-icons/io5";
import { Link } from "remix";

export default function MobileMenu() {
  return (
    <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
      <Menu
        control={
          <ActionIcon variant="transparent">
            <IoApps size={"20px"} />
          </ActionIcon>
        }
      >
        {menus.map((menu) => (
          <Menu.Item
            key={menu.name}
            component={Link}
            to={menu.to}
            icon={menu.icon}
          >
            {menu.name}
          </Menu.Item>
        ))}
      </Menu>
    </MediaQuery>
  );
}

const menus = [
  {
    name: "Home",
    icon: <AiOutlineHome size={"20px"} />,
    to: "/",
  },
  {
    name: "Categories",
    icon: <BsCollection size={"20px"} />,
    to: "/categories",
  },
  {
    name: "Plants",
    icon: <RiPlantLine size={"20px"} />,
    to: "/plants",
  },
];
