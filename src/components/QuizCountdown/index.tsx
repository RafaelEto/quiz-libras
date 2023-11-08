import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

interface QuizCountdownProps {
    totalTime: number,
    timeLeft: number
}

export default function QuizCountdown({totalTime, timeLeft}:QuizCountdownProps) {

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <CircularProgress value={percentage} size="100px" thickness={"6px"} trackColor={"#FCA82F"} color={"#6066D0"}>
            <CircularProgressLabel fontSize={"18px"} color={"#6066D0"}>
                {formatTime(timeLeft)}
            </CircularProgressLabel>
        </CircularProgress>
    );
}