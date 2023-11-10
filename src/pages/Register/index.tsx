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
import { useEffect, useState } from "react";
import { config } from "../../project.config";

const schema = z.object({
  name: z.string().min(2, "Nome inválido."),
  password: z.string().min(5, "Senha tem que ter no mínimo 5 caracteres."),
  email: z.string().email("Email inválido, tente novamente."),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged) {
      navigate("/menu");
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await fetch(`${config.NODE_URL}/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 201) {
      navigate("/");
      setLoading(false);
      return;
    }

    setRegisterErrorMessage(
      "Já existe uma conta associada a este e-mail, tente novamente."
    );
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
          Cadastre-se
        </Heading>
        <Image src="https://i.imgur.com/s767NVN.png" marginBottom={"60px"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ textAlign: "center", width: "70%" }}
        >
          <Box marginBottom={"32px"}>
            <Input
              {...register("name")}
              placeholder="Nome"
              _placeholder={{ opacity: 0.6, color: "#000" }}
              height={"50px"}
              borderRadius={"0"}
              border={"1px solid #333"}
            />
            {errors.name && <Text fontSize="14px">{errors.name.message}</Text>}
          </Box>
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
              height={"50px"}
              borderRadius={"0"}
              border={"1px solid #333"}
              type="password"
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
              Cadastrar
            </Button>
            {registerErrorMessage && (
              <Text fontSize="12px" color="red">
                {registerErrorMessage}
              </Text>
            )}
            <Link onClick={() => navigate("/")}>Já possui cadastro?</Link>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
