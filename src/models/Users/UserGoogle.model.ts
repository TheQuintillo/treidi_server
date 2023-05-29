import prisma from "../../libs/Prisma";
import { UserGoogle } from "@prisma/client";
import { UserGoogleTreidi } from "../../entities/Users/UserGoogle.entities";

export const findUser = async (
  query: UserGoogleTreidi
): Promise<UserGoogle | null> => {
  return await prisma.userGoogle.findUnique({ where: { email: query.email } });
};

export const createUser = async (
  data: UserGoogleTreidi
): Promise<UserGoogle> => {
  return await prisma.userGoogle.create({
    data,
  });
};

export const updateUser = async (
  id: number,
  data: UserGoogleTreidi
): Promise<UserGoogle> => {
  return await prisma.userGoogle.update({ where: { id }, data });
};
