import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  AspectRatio,
  Container,
  Spinner,
  Image
} from "@chakra-ui/react";
import Logo from "./components/ui/images/logo192.png";
import "./App.css";


function App() {
  const [filmes, setFilmes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("filmes"); // Mantém tudo em minúsculas
  const [loading, setLoading] = useState(true); // Começa carregando

  useEffect(() => {
    setLoading(true);
    fetch(`/${selectedCategory}.json`)
      .then((response) => response.json())
      .then((data) => setFilmes(data))
      .catch((error) => console.error("Erro ao carregar filmes:", error))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  return (
    <Container maxW="container.md" className="App">
      <Box textAlign="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image src={Logo} alt="Logo" boxSize="300px" />
        </Box>
        <Text fontSize="xl">
          Assista Filmes Completos no YouTube de uma forma muito mais rápida.
        </Text>

        {/* Menu de Categorias */}
        <HStack spacing={4} mt={8} justify="center">
          <Button colorScheme={selectedCategory === "filmes" ? "teal" : "gray"} onClick={() => handleCategorySelect("filmes")}>
            Filmes
          </Button>
          <Button colorScheme={selectedCategory === "kids" ? "teal" : "gray"} onClick={() => handleCategorySelect("kids")}>
            Kids
          </Button>
        </HStack>
      </Box>

      {/* Seção de Vídeos */}
      <Box mt={6}>
        {loading ? (
          <VStack mt={6}>
            <Spinner size="xl" color="teal.500" />
            <Text>Carregando vídeos...</Text>
          </VStack>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {filmes.map((video) => (
              <GridItem key={video.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allowFullScreen
                  />
                </AspectRatio>
                <Box p={4}>
                  <Heading size="md">{video.title}</Heading>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default App;