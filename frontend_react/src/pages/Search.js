import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Webcam from 'react-webcam';


function Search() {
  const webcamRef = React.useRef(null)
    return (
        <Container maxW="sm" centerContent>
        <Box p="4" boxShadow="lg" rounded="lg" bg="white">
          <Heading as="h1" size="xl" mb="4">
            Search
          </Heading>
          <Text fontSize="lg" mb="4">
            Bla bla bla
          </Text>
          <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true} // Dies kann entfernt oder auf "false" gesetzt werden, je nach Bedarf
      />
      <button onClick={capture}>Capture Photo</button>
        </Box>
      </Container>
      
    )
    function capture() {
      const imageSrc = webcamRef.current.getScreenshot();
      // Hier können Sie das Bild in Ihrer Anwendung verwenden, z.B. es anzeigen oder hochladen.
    }
}

export default Search;