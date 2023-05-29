import prisma from "../../libs/Prisma";
import { User } from "@prisma/client";
import { UserTreidi } from "../../entities/Users/User.entities";

export const findUser = async (query: UserTreidi): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email: query.email } });
};

export const createUser = async (data: UserTreidi): Promise<User> => {
  return await prisma.user.create({ data });
};

export const updateUser = async (
  id: number,
  data: UserTreidi
): Promise<User> => {
  return await prisma.user.update({ where: { id }, data });
};
