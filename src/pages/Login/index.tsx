import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { config } from "../../project.config";
import { useEffect, useState } from "react";

const schema = z.object({
  password: z.string().min(5, "Senha deve conter 5 caracteres."),
  email: z.string().email("Email inválido."),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      navigate("/menu");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await fetch(`${config.NODE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      localStorage.setItem("isLogged", "true");
      navigate("/menu");
      return;
    }

    if (response.status === 401) {
      setLoginErrorMessage("Email ou senhas inválidos, tente novamente.");
    }

    setLoading(false);
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
        <Image src="https://i.imgur.com/s767NVN.png" marginBottom={"60px"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ textAlign: "center", width: "70%" }}
        >
          <Box marginBottom={"32px"}>
            <Input
              {...register("email")}
              placeholder="Email"
              _placeholder={{ opacity: 0.6, color: "#000" }}
              height={"50px"}
              borderRadius={"0"}
              border={"1px solid #333"}
            />
            {errors.email && (
              <Text fontSize="14px">{errors.email.message}</Text>
            )}
          </Box>
          <Box marginBottom={"16px"}>
            <Input
              {...register("password")}
              placeholder="Senha"
              _placeholder={{ opacity: 0.6, color: "#000" }}
              type="password"
              height={"50px"}
              borderRadius={"0"}
              border={"1px solid #333"}
            />
            {errors.password && (
              <Text fontSize="14px">{errors.password.message}</Text>
            )}
          </Box>
          <Flex flexDirection="column" alignItems="center" gap="10px">
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
              isLoading={loading}
            >
              Login
            </Button>
            {loginErrorMessage && (
              <Text fontSize="14px" color="red">
                {loginErrorMessage}
              </Text>
            )}
            <Link onClick={() => navigate("/register")}>Cadastre-se</Link>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
