import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
    _id: string;
    name: string;
    email: string;
    formattedTime: string;
    quizTime: number;
    score: number;
}

export default function Ranking() {
    const navigate = useNavigate()
    const [listUsers, setListUsers] = useState<User[]>([])

    useEffect(() => {
        fetch(`http://localhost:3000/ranking`).then(response => response.json()).then(response => {
            setListUsers(response)
        })
    }, [])

    return (
        <Box
            width={"100vw"}
            height={"100vh"}
            padding={"30px 15px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Flex
                direction={"column"}
                align={"center"}
                justify={"space-between"}
                height={"100%"}
                width={"100%"}
                maxWidth={"500px"}
                margin={"0 auto"}
            >
                <Heading
                    as={"h1"}
                    fontSize={"32px"}
                    fontWeight={"700"}
                    color={"#000"}
                    lineHeight={"40px"}
                    width={"100%"}
                    textAlign={"center"}
                >
                    Ranking
                </Heading>
                <Flex className="userList" direction={"column"} align={"stretch"} justify={"flex-start"} maxHeight={"calc(100vh - 190px)"} width={"100%"} height={"100%"} overflowY={"auto"} padding={"0 10px"}>
                    {listUsers.map((user, index) => (
                        <Flex className="user" data-index={index} key={user._id} justify={"space-between"} align={"center"} marginBottom={"12px"} borderRadius={"4px"} boxShadow={"0 3px 6px rgba(19, 19, 19, .24)"} padding={"8px"}>
                            <Box flex={"0 1 10%"}>
                                <Text
                                    bgColor={"#535050"}
                                    borderRadius={"50%"}
                                    maxWidth={"24px"}
                                    textAlign={"center"}
                                    lineHeight={"24px"}
                                    color={"#fff"}
                                    fontWeight={"700"}
                                    fontSize={"12px"}
                                >
                                    {index + 1}
                                </Text>
                            </Box>
                            <Heading as="h3" fontSize="14px" color={"#6066D0"} flex={"0 1 60%"} noOfLines={1}>
                                {user.name}
                            </Heading>
                            <Text flex={"0 1 15%"} fontSize="12px" fontWeight={"700"} color={"#6066D0"}>
                                {user.score}/10
                            </Text>
                            <Text flex={"0 1 15%"} fontSize="12px" textAlign={"right"} fontWeight={"700"} color={"#6066D0"}>
                                {user.formattedTime}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <Button
                    bgColor={"#FCA82F"}
                    _hover={{ background: "#6066D0" }}
                    borderRadius={"4px"}
                    height={"50px"}
                    fontSize={"18px"}
                    fontWeight={"400"}
                    color={"#fff"}
                    onClick={() => navigate("/menu")}
                    width={"100%"}
                >
                    Voltar
                </Button>
            </Flex>
        </Box>
    );
}