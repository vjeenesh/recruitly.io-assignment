import { Card, Text, Group, Badge, Button, em } from "@mantine/core";
import classes from "./BadgeCard.module.css";
import { NavLink } from "react-router-dom";

export function BadgeCard({
  company_name,
  id,
  employees_count,
  city_country,
  industries,
}) {
  const features = industries.map((badge) => (
    <Badge variant="light" key={badge.name}>
      {badge.name}
    </Badge>
  ));

  employees_count = employees_count
    ? employees_count?.includes("employees")
      ? employees_count
      : employees_count + " employees"
    : "";

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={`bg-gray-100 ${classes.card}`}
    >
      <Card.Section className={classes.section} mt="md" withBorder>
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {company_name}
          </Text>
          <Badge size="sm" variant="light">
            {city_country}
          </Badge>
          <Text className="text-right ml-auto" fz="sm" fw={100}>
            {employees_count}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={`h-full ${classes.section}`}>
        <Text mt="md" className="text-start" c="dimmed">
          Industry
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <NavLink
        to={`/${id}`}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <Button radius="md" className="w-full">
          Show details
        </Button>
      </NavLink>
    </Card>
  );
}
