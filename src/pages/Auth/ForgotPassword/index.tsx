import { Box, Button, Center, Image, Input, Text, Title } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  return (
    <Center p="xl">
      <Box p="xl">
        {/* double xl on purpose */}
        <Box style={{ alignItems: "center", flexDirection: "column" }} display="flex">
          <Box display="flex" style={{ alignItems: "center" }} mb="lg">
            <Image src="images/icons/vsus.svg" w="50px" h="auto" alt="logo" />
            <Title order={1} ml="md">
              vSuS
            </Title>
          </Box>
          <Text size="xl" weight={700} align="center">
            Reset your password
          </Text>
        </Box>
        <Box
          component="form"
          display="flex"
          style={{
            flexDirection: "column",
            backgroundColor: "var(--mantine-color-dark-8)",
            borderRadius: "12px",
          }}
          w="340px"
          p="lg"
          h="min-content"
          mt="xl"
          onSubmit={form.onSubmit(async () => {})}
        >
          <Input
            variant="filled"
            required
            placeholder="Enter your email"
            leftSection={<IconAt size={16} />}
            w="100%"
            id="email"
            {...form.getInputProps("email")}
          />
          <Button variant="light" color="vsus-button" mt="lg" w="100%" type="submit">
            Get reset code
          </Button>
        </Box>
        <Text size="sm" weight={700} align="center" mt="xl">
          Remembered your password? Awesome!{" "}
          <Link to="/signin" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
