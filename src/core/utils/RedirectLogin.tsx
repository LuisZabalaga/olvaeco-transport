import React from "react";
import { Navigate } from "react-router-dom";

export default function RedirectLogin(){
    return <Navigate to="/login" />
}