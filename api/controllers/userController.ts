import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const UserController = {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  },

  async show(req: Request, res: Response) {
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
  },

  async create(req: Request, res: Response) {
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
  },

  async update(req: Request, res: Response) {
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
  },

  async delete(req: Request, res: Response) {
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
  },
};

module.exports = UserController;
