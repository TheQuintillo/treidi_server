import prisma from "../../libs/Prisma";
import { UserFacebook } from "@prisma/client";
import { UserFacebookTreidi } from "../../entities/Users/UserFacebook.entities";

export const findUser = async (
  query: UserFacebookTreidi
): Promise<UserFacebook | null> => {
  return await prisma.userFacebook.findUnique({
    where: { email: query.email },
  });
};

export const createUser = async (
  data: UserFacebookTreidi
): Promise<UserFacebook> => {
  return await prisma.userFacebook.create({
    data,
  });
};

export const updateUser = async (
  id: number,
  data: UserFacebookTreidi
): Promise<UserFacebook> => {
  return await prisma.userFacebook.update({ where: { id }, data });
};
