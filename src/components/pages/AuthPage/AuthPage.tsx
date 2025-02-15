import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common";
import { showAlert } from "../../../App";
import "./AuthPage.css";

const AuthPage = ({ isLogin }: { isLogin: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          showAlert("Успешная регистрация!", "success");
          navigate("/login")
        }
      } else {
        showAlert(`Что-то пошло не так: ${data.message}`, "error");
      }
    } catch (err) {
      showAlert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.", "error");
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
      </form>
      <Button variant="secondary" onClick={() => navigate("/")}>
        Вернуться к объявлениям
      </Button>
    </div>
  );
};

export default AuthPage;
