import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";

export const UserHelper = {
  async create(args?: Partial<User>): Promise<User> {
    return await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        ...args,
      },
    });
  },
};
