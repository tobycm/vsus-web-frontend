import { ActionIcon, Avatar, Box, Button, Center, Container, CopyButton, Divider, Flex, Grid, Group, Text, Title, Tooltip, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAdjustments, IconCheck, IconCircleFilled, IconCopy, IconDeviceDesktopAnalytics, IconPlus, IconUserCode } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link, useLoaderData } from "react-router-dom";
import UserHoverCard from "../../../components/UserHoverCard";
import { User, Workspace } from "../../../database/models";
import { setDocumentTitle } from "../../../utils";
import Error404 from "../../Error/404";
import classes from "./index.module.css";

const data = [
  {
    title: "Instances",
    number: 5,
  },
  {
    title: "Blocks",
    number: 4,
  },
  {
    title: "Deployments",
    number: 5,
  },
  {
    title: "CI/CD Jobs",
    number: 2,
  },
];

export default function WorkspaceOverview() {
  const isMobile = useMediaQuery(`(max-width: 36em)`);
  const { workspace } = useLoaderData() as { workspace: Workspace };

  if (!workspace) return <Error404 />;

  useEffect(() => {
    setDocumentTitle(`${workspace.name} | Workspace`);
  }, [workspace]);

  return (
    <Container size="xl">
      <Flex justify="space-between">
        <Group w="100%" mr="lg">
          <IconDeviceDesktopAnalytics size={40} />
          <Title order={2}>{workspace.name}</Title>
        </Group>
        <ActionIcon variant="light" size="lg" radius="sm" aria-label="Workspace's Option">
          <IconAdjustments size={20} />
        </ActionIcon>
      </Flex>
      <Group mt="lg" gap="xs">
        <IconUserCode size={25} style={{ color: "var(--mantine-color-dimmed)" }} />
        {workspace.users.map((user: User, index: number) => {
          console.log(user);
          return (
            <UserHoverCard profile={user} workspaceOwner={index == 0}>
              <Avatar src={user.avatar} component={Link} to={`/user/${user.username}`} />
            </UserHoverCard>
          );
        })}
      </Group>
      <Divider my="lg" />
      <Title order={3}>Overview</Title>
      <Grid mt="md" mb="xl">
        {data.map((item) => (
          <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
            <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
              <Title order={3}>{item.title}</Title>
              <Text style={{ fontSize: "calc(1.5*var(--mantine-font-size-xl))" }}>{item.number}</Text>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
      <Title order={3} mt="xl">
        Instances
      </Title>
      <Grid mt="md" mb="xl">
        {[...Array(5).keys()].map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
              <Flex justify="space-between" direction={isMobile ? "column" : "row"}>
                <Flex direction="column" justify="space-between" mr={isMobile ? "0" : "sm"} mb={isMobile ? "sm" : "0"}>
                  <Group>
                    <Title order={4} className={classes.link}>
                      Instance #{item + 1}
                    </Title>
                    {item < 3 && (
                      <Tooltip label="Running" openDelay={250}>
                        <IconCircleFilled style={{ width: rem(16), color: "var(--mantine-color-green-text)" }} />
                      </Tooltip>
                    )}
                  </Group>
                  <Group gap="xs">
                    <Text>
                      <span style={{ color: "var(--mantine-color-dimmed)" }}>IP:</span> 20.20.20.20
                    </Text>
                    <CopyButton value="20.20.20.20" timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                            {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Flex>
                <Box>
                  <Text>
                    <span style={{ color: "var(--mantine-color-dimmed)" }}>vCPUs:</span> 2
                  </Text>
                  <Text>
                    <span style={{ color: "var(--mantine-color-dimmed)" }}>vRAMs:</span> 2
                  </Text>
                  <Text>
                    <span style={{ color: "var(--mantine-color-dimmed)" }}>Storage:</span> 18.5GB/20GB (93%)
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid.Col>
        ))}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Button p="lg" variant="light" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%" w="100%" mih={114.39}>
            <Center>
              <Group>
                <IconPlus size={24} />
                <Text size="xl" weight={700}>
                  New instance
                </Text>
              </Group>
            </Center>
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
