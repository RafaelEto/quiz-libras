import { Flex, Progress, Text } from "@chakra-ui/react";

interface QuizProgressProps {
    question: number
}

export default function QuizProgress({question}:QuizProgressProps) {
    return (
        <Flex
            width={"100%"}
            padding={"8px 16px"}
            border={"1px solid #ddd"}
            borderRadius={"24px"}
            align={"center"}
            justify={"space-between"}
        >
            <Progress
                value={question*10}
                colorScheme="yellow"
                flex={"1"}
                borderRadius={"24px"}
                boxShadow={"0 3px 6px rgba(0, 0, 0, .16)"}
                marginRight={"12px"}
            />
            <Text
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"20px"}
                color={"#000"}
            >
                {question}/10
            </Text>
        </Flex>
    );
}
