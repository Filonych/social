import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom"

export const Root = () => {

  return (
    <>
<NavLink to={"/"}>Главная </NavLink>
<NavLink>Мой профиль</NavLink>
<NavLink>Посты</NavLink>
<NavLink to={"/auth"}>Войти</NavLink>
<NavLink to={"/registration"}>Создать профиль</NavLink>
<NavLink>Выйти</NavLink>
      <Outlet />
    </>
  );
};
