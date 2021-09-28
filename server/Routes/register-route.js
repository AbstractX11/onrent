import express from "express";
import { createUser } from "../firebase/firebase.js";
// import bcrypt from 'bcrypt'
// import dotenv from 'dotenv';
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  await createUser({
    email: email,
    password: password,
    username: username,
  });
  console.log("request received")
  return res.json({ loginStatus: true});
});

export default router;
