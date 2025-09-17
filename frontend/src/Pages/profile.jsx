import React, { useEffect, useState } from "react";
import Service from "../utils/http";
import { Center, Text, Avatar, Stack } from "@mantine/core";

const obj = new Service();

export default function Profile() {
  const [user, setUser] = useState({});

  const getProfileData = async () => {
    try {
      let data = await obj.get("user/me");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Center mt={40}> {/* Pushes content down a bit */}
      <Stack align="center" spacing="sm">
        {/* Profile Picture */}
        <Avatar
          src={user?.profilePic || "https://via.placeholder.com/150"}
          alt={user?.name}
          size={120}
          radius="100%"
        />

        {/* User Name */}
        <Text size="xl" weight={600}>
          {user?.name || "No Name"}
        </Text>

        {/* User Email */}
        <Text size="sm" color="dimmed">
          {user?.email || "No Email"}
        </Text>
      </Stack>
    </Center>
  );
}
