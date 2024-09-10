import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
} from "@mantine/core";
import { redirect, useNavigate } from "react-router-dom";
import { useLogin } from "../App";

export default function Login() {
  const { setIsLoggedIn } = useLogin();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <Container className="text-left" size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="username@email.com" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button onClick={handleLogin} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
