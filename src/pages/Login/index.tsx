import { Box, Button, Flex, Heading, Image, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
});

type FormData = {
    name: string;
    email: string;
};
  
export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const logged = localStorage.getItem("userId")

        if (logged) {
            navigate("/menu");
        }
    })

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            
            localStorage.setItem("userId", responseData._id)
            
            navigate("/menu");
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                justify={"center"}
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
                    marginBottom={"40px"}
                >
                    Login
                </Heading>
                <Image src="/src/assets/img/logo-login.png" marginBottom={"60px"} />
                <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }} >
                    <Input
                        {...register("name")}
                        placeholder="Nome e sobrenome"
                        _placeholder={{ opacity: 0.6, color: "#000" }}
                        height={"50px"}
                        borderRadius={"0"}
                        border={"1px solid #333"}
                        marginBottom={"16px"}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <Input
                        {...register("email")}
                        placeholder="Email"
                        _placeholder={{ opacity: 0.6, color: "#000" }}
                        height={"50px"}
                        borderRadius={"0"}
                        border={"1px solid #333"}
                        marginBottom={"32px"}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <Button
                        bgColor={"#FCA82F"}
                        _hover={{ background: "#6066D0" }}
                        borderRadius={"4px"}
                        width={"240px"}
                        height={"50px"}
                        fontSize={"18px"}
                        fontWeight={"400"}
                        color={"#fff"}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Flex>
        </Box>
    );
}