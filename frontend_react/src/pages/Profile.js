import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";


function Profile() {
    return (
        <Container maxW="sm" centerContent>
        <Box p="4" boxShadow="lg" rounded="lg" bg="white">
          <Heading as="h1" size="xl" mb="4">
            Profil
          </Heading>
          <Text fontSize="lg" mb="4">
            Bla bla bla
          </Text>
        </Box>
      </Container>
    )
}

export default Profile;