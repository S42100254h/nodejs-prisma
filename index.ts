import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

const posts = require("./router/posts");

app.use(express.json());

const prisma = new PrismaClient({ rejectOnNotFound: true });

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.use("/posts", posts);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
