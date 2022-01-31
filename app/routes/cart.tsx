import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
export default function Cart() {
  const initialCart = {
    plants: [],
    totalUniquePlants: 0,
    totalPlants: 0,
    totalPrice: {
      raw: 0,
      formatted_with_symbol: "₹0.00",
    },
  };
  const [cart, setCart] = useState(initialCart);

  function fetchCart() {
    const cart = localStorage.cart
      ? JSON.parse(localStorage.cart)
      : initialCart;
    setCart(cart);
  }
  useEffect(() => {
    fetchCart();
  }, []);

  function handleCartPlantsQuantity(plantId, type) {
    const cart = JSON.parse(localStorage.cart);
    const plant = cart.plants.find((p) => p.id === plantId);

    const newCart = {
      ...cart,
    };

    if (type === "add") {
      plant.quantity += 1;
      newCart.totalPlants += 1;
      newCart.totalPrice = {
        formatted_with_symbol: `₹${cart.totalPrice.raw + plant.price.raw}`,
        raw: cart.totalPrice.raw + plant.price.raw,
      };
      newCart.plants[plant.id] = plant;
    } else if (type === "sub") {
      plant.quantity -= 1;
      newCart.totalPlants -= 1;
      newCart.totalPrice = {
        formatted_with_symbol: `₹${cart.totalPrice.raw - plant.price.raw}`,
        raw: cart.totalPrice.raw - plant.price.raw,
      };
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    fetchCart();
  }
  return (
    <Box>
      <Grid>
        <Grid.Col xs={12} md={8}>
          {cart.plants.length ? (
            <Paper shadow={"sm"}>
              <Table verticalSpacing={"xl"}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.plants.map((plant) => (
                    <tr>
                      <td>{plant.name}</td>
                      <td>
                        <Group spacing={"xs"} align={"center"}>
                          <ActionIcon
                            variant="outline"
                            color="green"
                            size="sm"
                            onClick={() =>
                              handleCartPlantsQuantity(plant.id, "add")
                            }
                          >
                            <RiAddFill size={16} />
                          </ActionIcon>
                          <Text align="center" weight={"bold"}>
                            {plant.quantity}
                          </Text>
                          <ActionIcon
                            variant="outline"
                            color="green"
                            size="sm"
                            onClick={() =>
                              handleCartPlantsQuantity(plant.id, "sub")
                            }
                          >
                            <TiMinus size={16} />
                          </ActionIcon>
                        </Group>
                      </td>
                      <td>{plant.price.formatted_with_symbol}</td>
                      <td>
                        <ActionIcon variant="filled" color="red">
                          <AiOutlineDelete size={18} />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          ) : (
            <Center>
              <Text size="xl" color="dimmed">
                Cart is empty
              </Text>
            </Center>
          )}
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg">
            <Title order={3}>Order Summary</Title>
            <Divider my={"xl"} />

            <Box
              my={"sm"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text weight={500} size="lg">
                Unique Plants
              </Text>
              <Text weight={600} size="lg">
                {cart.totalUniquePlants}
              </Text>
            </Box>
            <Box
              my={"sm"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text weight={500} size="lg">
                Total Plants
              </Text>
              <Text weight={600} size="lg">
                {cart.totalPlants}
              </Text>
            </Box>
            <Box
              my={"sm"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text weight={500} size="lg">
                Total Cost
              </Text>
              <Text weight={600} size="lg">
                {cart.totalPrice.formatted_with_symbol}
              </Text>
            </Box>

            <Button
              fullWidth
              disabled={cart.plants.length === 0}
              size="lg"
              color="green"
              leftIcon={<MdPayment size={24} />}
            >
              Checkout
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
