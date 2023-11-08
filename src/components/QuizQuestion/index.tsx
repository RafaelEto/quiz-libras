import { Button, Flex, Text } from "@chakra-ui/react";
import { Question } from "../../typings/question.type";
import { useState } from "react";
import ReactPlayer from "react-player";

type QuizQuestionProps = {
  question: Question;
  handleNextStep: (answer: string, questionId: string) => void;
};

interface AnswerSelected {
  questionId: string;
  answer: string;
}

export default function QuizQuestion({
  question,
  handleNextStep,
}: QuizQuestionProps) {
  const [answerSelected, setAnswerSelected] = useState<AnswerSelected>();

  function handleAnswerSelect(key: string) {
    setAnswerSelected({
      questionId: question._id,
      answer: key,
    });
  }

  return (
    <>
      <Flex direction={"column"} align={"center"} width={"100%"}>
        <ReactPlayer
          url={
            question.video_url
          }
          width={"90%"}
          height={"200px"}
          loop
          muted
          playing
          style={{ margin: "0 0 16px", pointerEvents: "none" }}
          config={{ youtube: { playerVars: { disablekb: 1, showinfo: 0 } } }}
        />
        <Text
          fontSize={"18px"}
          fontWeight={"500"}
          color={"#000"}
          marginBottom={"16px"}
          width={"100%"}
        >
          Traduza:
        </Text>
        {Object.entries(question.answers).map(([key, value]) => (
          <Flex
            align={"center"}
            borderRadius={"24px"}
            padding={"8px 12px"}
            bgColor={"#fff"}
            boxShadow={"0 3px 6px rgba(0, 0, 0, .16)"}
            width={"100%"}
            marginBottom={"8px"}
            fontSize={"14px"}
            border={"2px solid transparent"}
            _focus={{
              border: "2px solid #FCA82F",
            }}
            tabIndex={0}
            onClick={() => handleAnswerSelect(key)}
          >
            <Text marginRight={"6px"} color={"#6066D0"}>
              {key}
            </Text>
            <Text>{value}</Text>
          </Flex>
        ))}
      </Flex>
      <Button
        bgColor={"#FCA82F"}
        _hover={{ background: "#6066D0" }}
        borderRadius={"4px"}
        width={"240px"}
        minHeight={"50px"}
        fontSize={"18px"}
        fontWeight={"400"}
        color={"#fff"}
        onClick={() =>
          handleNextStep(
            answerSelected?.answer || "",
            answerSelected?.questionId || ""
          )
        }
        isDisabled={!answerSelected}
      >
        Próxima Pergunta
      </Button>
    </>
  );
}
