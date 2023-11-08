import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../project.config";

export default function Menu() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [score, setScore] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }

    fetch(`${config.NODE_URL}/users/${userId}`)
      .then((response) => response.json())
      .then((response) => {
        setScore(response.score);
        setTime(response.formattedTime);
      });
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      padding={"30px 45px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        direction={"column"}
        align={"stretch"}
        justify={"flex-start"}
        height={"100%"}
        width={"100%"}
        maxWidth={"500px"}
        margin={"0 auto"}
      >
        <Image
          src="https://i.imgur.com/ERNTvDY.png"
          display={"block"}
          width={"max-content"}
          margin={"0 auto 40px"}
        />
        {score ? (
          <Box marginBottom={"40px"}>
            <Text
              textAlign={"center"}
              fontSize={"24px"}
              fontWeight={"700"}
              color={"#000"}
              lineHeight={"40px"}
              marginBottom={"16px"}
            >
              Seu último score
            </Text>
            <Flex justify={"space-between"} align={"center"}>
              <Text fontSize={"18px"} color={"#6066D0"} display={"flex"}>
                Pontuação:
                <Text color={"#FCA82F"} marginLeft={"8px"}>
                  {score}/10
                </Text>
              </Text>
              <Text fontSize={"18x"} color={"#6066D0"} display={"flex"}>
                Tempo:
                <Text color={"#FCA82F"} marginLeft={"8px"}>
                  {time}
                </Text>
              </Text>
            </Flex>
          </Box>
        ) : (
          <></>
        )}
        <Button
          bgColor={"#FCA82F"}
          _hover={{ background: "#6066D0" }}
          borderRadius={"4px"}
          height={"50px"}
          fontSize={"18px"}
          fontWeight={"400"}
          color={"#fff"}
          onClick={() => navigate("/quiz")}
        >
          Começar Quiz
        </Button>
        <Button
          bgColor={"#FCA82F"}
          _hover={{ background: "#6066D0" }}
          borderRadius={"4px"}
          height={"50px"}
          fontSize={"18px"}
          fontWeight={"400"}
          color={"#fff"}
          margin={"32px 0"}
          onClick={() => navigate("/ranking")}
        >
          Ver Ranking
        </Button>
        <Button
          bgColor={"#6066D0"}
          _hover={{ background: "#FCA82F" }}
          borderRadius={"4px"}
          height={"50px"}
          fontSize={"18px"}
          fontWeight={"400"}
          color={"#fff"}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Flex>
    </Box>
  );
}
