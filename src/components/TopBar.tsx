import React from "react";

import {
  Heading,
  Image,
  HStack,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";

import LogoImg from "../assets/logo.png";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function TopBar() {
  return (
    <HStack boxShadow="md">
      <Grid templateRows="1fr" templateColumns="1fr 1fr" m={2} w="100%">
        <GridItem>
          <HStack>
            <Image
              src={LogoImg}
              alt="Todo App Logo"
              borderRadius={"xl"}
              boxSize={"40px"}
            />
            <Heading cursor="" as="h1" size="l">
              Todo App
            </Heading>
          </HStack>
        </GridItem>
        <GridItem justifySelf="end" justifyContent="space-around">
          <Grid templateRows="1fr" templateColumns="1fr 1fr">
            <GridItem>
              <ColorModeSwitcher />
            </GridItem>
            <GridItem>
              <Menu placement="bottom-end" size="sm">
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <SettingsIcon />
                </MenuButton>
                <MenuList minW={120}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout </MenuItem>
                </MenuList>
              </Menu>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </HStack>
  );
}
