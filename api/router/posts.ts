import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
