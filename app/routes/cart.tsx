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
import { AiOutlineDelete } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import { LoaderFunction, useLoaderData } from "remix";
import { commerce } from "~/utils/commerce";

export const loader: LoaderFunction = async () => {
  try {
    const cart = await commerce.cart.retrieve();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
export default function Cart() {
  const cart = useLoaderData();
  console.log(cart);
  return (
    <Box>
      <Grid>
        <Grid.Col xs={12} md={8}>
          {cart.line_items.length ? (
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
                  <tr>
                    <td>Plant 1</td>
                    <td>
                      <Group spacing={"xs"} align={"center"}>
                        <ActionIcon variant="outline" color="green" size="sm">
                          <RiAddFill size={16} />
                        </ActionIcon>
                        <Text align="center" weight={"bold"}>
                          4
                        </Text>
                        <ActionIcon variant="outline" color="green" size="sm">
                          <TiMinus size={16} />
                        </ActionIcon>
                      </Group>
                    </td>
                    <td>300</td>
                    <td>
                      <ActionIcon variant="filled" color="red">
                        <AiOutlineDelete size={18} />
                      </ActionIcon>
                    </td>
                  </tr>
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
                {cart.total_unique_items}
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
                {cart.total_items}
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
                {cart.subtotal.formatted_with_symbol}
              </Text>
            </Box>

            <Button
              fullWidth
              disabled={cart.total_items === 0}
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
