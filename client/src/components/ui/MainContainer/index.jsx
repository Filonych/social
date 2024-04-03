import React from "react";
import * as SC from "./styles";
import { useLocation } from 'react-router-dom'

export const MainContainer = ({ children }) => { 
  const location = useLocation();

const isDetailPostPage = location.pathname.includes('/posts/');
console.log('isDetailPostPage',isDetailPostPage)
  return(
  <SC.MainContainer isDetailPostPage={isDetailPostPage}>{children}</SC.MainContainer>
)}