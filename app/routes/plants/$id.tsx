import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { commerce } from "~/utils/commerce";

export const loader: LoaderFunction = async ({ params }) => {
  const plantId: string = params.id as string;
  try {
    const plant = await commerce.products.retrieve(plantId);
    return plant;
  } catch (error) {
    console.log(error);
  }
};

export default function Plant() {
  const plant = useLoaderData();
  const [plantImage, setPlantImage] = useState(plant.image.url);

  function handleAddToCart(plant) {
    plant = {
      name: plant.name,
      price: plant.price,
      id: plant.id,
      quantity: 1,
    };

    const initialCart = {
      plants: [],
      totalUniquePlants: 0,
      totalPlants: 0,
      totalPrice: {
        raw: 0,
        formatted_with_symbol: "₹0.00",
      },
    };
    const cart = localStorage.cart
      ? JSON.parse(localStorage.cart)
      : initialCart;

    if (cart.plants.length) {
      const plantIndex = cart.plants.findIndex((p) => p.id === plant.id);

      if (plantIndex > -1) {
        console.log("plant already in cart");
        return;
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...cart,
            plants: [...cart.plants, plant],
            totalPrice: {
              raw: cart.totalPrice.raw + plant.price.raw,
              formatted_with_symbol: `₹${
                cart.totalPrice.raw + plant.price.raw
              }`,
            },
            totalUniquePlants: cart.totalUniquePlants + 1,
            totalPlants: cart.totalPlants + 1,
          })
        );
      }
    } else {
      const cart = {
        totalPlants: 1,
        totalUniquePlants: 1,
        totalPrice: {
          raw: plant.price.raw,
          formatted_with_symbol: `₹${plant.price.raw}`,
        },
        plants: [plant],
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  return (
    <Box>
      <Grid>
        <Grid.Col xs={12} sm={12} md={6}>
          <Group direction="column" align={"center"}>
            <Image
              radius={"lg"}
              src={plantImage}
              width={"100%"}
              height={400}
              fit="contain"
            />
            <Group grow position="center">
              {plant.assets.map((image) => (
                <ActionIcon
                  key={image.id}
                  size={"xl"}
                  onClick={() => setPlantImage(image.url)}
                >
                  <Image src={image.url} radius={"md"} />
                </ActionIcon>
              ))}
            </Group>
          </Group>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6}>
          <Group direction="column">
            <Title order={3}>{plant.name}</Title>
            <Text weight={600} size="xl">
              {plant.price.formatted_with_symbol}
            </Text>
            {plant.active ? (
              <Badge color="green" variant="light">
                Available
              </Badge>
            ) : (
              <Badge color="red" variant="light">
                Out Of Stock
              </Badge>
            )}
            <TypographyStylesProvider>
              <Box dangerouslySetInnerHTML={{ __html: plant.description }} />
            </TypographyStylesProvider>

            <Button
              color={"green"}
              size="lg"
              onClick={() => handleAddToCart(plant)}
            >
              Add to Cart
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
