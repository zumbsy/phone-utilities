import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faContactBook as solidContact, 
  faStickyNote as solidNote, 
  faMap as solidMap, 
  faUser as solidUser, 
  faCreditCard as solidCreditCard 
} from "@fortawesome/free-solid-svg-icons";

import { 
  faContactBook as regularContact, 
  faStickyNote as regularNote, 
  faMap as regularMap, 
  faUser as regularUser, 
  faCreditCard as regularCreditCard 
} from "@fortawesome/free-regular-svg-icons";


function Navigation() {
  const location = useLocation();
  const [iconMap] = useState({
    '/home': { solid: solidContact, regular: regularContact },
    '/search': { solid: solidNote, regular: regularNote },
    '/card': { solid: solidCreditCard, regular: regularCreditCard },
    '/map': { solid: solidMap, regular: regularMap },
    '/profile': { solid: solidUser, regular: regularUser },
  });

  const currentPage = location.pathname;

    return (
        <VStack
          spacing="0"
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="6"
          pt="4"
          pb="12"
          bg="black"
        >
      <HStack spacing="4" justifyContent="space-between" w="100%">
      {Object.keys(iconMap).map((route) => (
        <Link key={route} to={route}>
          <FontAwesomeIcon
            icon={currentPage === route ? iconMap[route].solid : iconMap[route].regular}
            size="lg"
            color="white"
          />
        </Link>
        ))}
      </HStack>
        </VStack>
    );
  }

  export default Navigation;