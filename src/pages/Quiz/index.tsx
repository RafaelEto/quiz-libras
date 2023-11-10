import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import QuizProgress from "../../components/QuizProgress";
import QuizCountdown from "../../components/QuizCountdown";
import QuizQuestion from "../../components/QuizQuestion";
import { Question } from "../../typings/question.type";
import { useNavigate } from "react-router-dom";
import { config } from "../../project.config";

export default function Quiz() {
  const navigate = useNavigate();
  const totalTime = 600;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    _id: "",
    video_url: "",
    answers: {
      a: "",
      b: "",
      c: "",
      d: "",
    },
  });
  const score = useRef(0);

  useEffect(() => {
    fetch(`${config.NODE_URL}/questions`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        setQuestions(response);
        setCurrentQuestion(response[0]);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        navigate("/menu");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  async function handleNextStep(answer: string, questionId: string) {
    try {
      const response = await fetch(
        `${config.NODE_URL}/answers/validate/${questionId}`,
        {
          method: "POST",
          body: JSON.stringify({ answer }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (responseData.status === "hit") {
        score.current = score.current + 1;
        console.log(score.current, "score dessa bomba");
      }

      if (step === 10) {
        handleFinishQuiz();
        return;
      }

      setCurrentQuestion(questions[step]);
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function handleFinishQuiz() {
    const time = totalTime - timeLeft;

    try {
      await fetch(`${config.NODE_URL}/score`, {
        method: "POST",
        body: JSON.stringify({ score: score.current, time }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      navigate("/menu");
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      padding={"30px 45px"}
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
        >
          Libras
        </Heading>
        <QuizProgress question={step} />
        <QuizCountdown totalTime={totalTime} timeLeft={timeLeft} />
        <QuizQuestion
          question={currentQuestion}
          handleNextStep={handleNextStep}
        />
      </Flex>
    </Box>
  );
}
