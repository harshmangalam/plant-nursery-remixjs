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

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.formData();
    await commerce.cart.add(data._fields.plantId[0], 1);
    return redirect(`/cart`);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default function Plant() {
  const plant = useLoaderData();
  const cartData = useActionData();
  const transition = useTransition();
  const [plantImage, setPlantImage] = useState(plant.image.url);

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
          <Group direction="column" align={"start"}>
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

            <Form method="post">
              <input type="hidden" value={plant.id} name="plantId" />
              <Button
                loading={transition.state === "submitting"}
                disabled={transition.state === "submitting"}
                type="submit"
                color={"green"}
                size="lg"
              >
                Add to Cart
              </Button>
            </Form>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
