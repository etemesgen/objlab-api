import * as express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const signin = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Identifiant ou mot de passe invalide" });
    }
     
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiant ou mot de passe invalide" });
    }
    
    const authenticatedUser = { ...user.toObject(), password: undefined };

    res.status(200).json({authenticatedUser, message: "Connexion reussie" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};