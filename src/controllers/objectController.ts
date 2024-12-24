import * as express from "express";
import Object from "../models/Object";

export const createObject = async (req: express.Request, res: express.Response) => {
  try {
    const object = new Object(req.body);

    await object.save();
    res.status(201).json(object);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l'objet" });
  }
};

export const getAllObjects = async (req: express.Request, res: express.Response) => {
  try {
    const objects = await Object.find();

    res.status(200).json(objects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des objets" });
  }
};

export const getObject = async (req: express.Request, res: express.Response) => {
  try {
    const object = await Object.findById(req.params.id);
    
    if (!object) {
      return res.status(404).json({ message: "Objet non trouvé" });
    }
    
    res.status(200).json(object);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de l'objet" });
  }
};

export const updateObject = async (req: express.Request, res: express.Response) => {
  try {
    const object = await Object.findById(req.params.id);
    
    if (!object) {
      return res.status(404).json({ message: "Objet non trouvé" });
    }

    object.set(req.body);
    await object.save();
    res.status(200).json(object);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'objet" });
  }
};

export const deleteObject = async (req: express.Request, res: express.Response) => {
  try {
    const object = await Object.findById(req.params.id);   

    if (!object) {
      return res.status(404).json({ message: "Objet non trouvé" });
    }

    await object.deleteOne();
    res.status(200).json({ message: "Objet supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'objet" });
  }
};