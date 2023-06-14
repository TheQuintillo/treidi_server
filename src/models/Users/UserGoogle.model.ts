import prisma from "../../libs/Prisma";
import { UserGoogle } from "@prisma/client";
import {
  UserGoogleTreidi,
  FindUserGoogleTreidi,
  RequestUserGoogle,
} from "../../entities/Users/UserGoogle.entities";

export class UserGooglePrisma {
  findUser = async (
    payload: RequestUserGoogle | string
  ): Promise<UserGoogle | null> => {
    if (typeof payload === "string") {
      return await prisma.userGoogle.findUnique({
        where: {
          email: payload,
        },
      });
    } else {
      return await prisma.userGoogle.findUnique({
        where: {
          email: payload.email,
        },
      });
    }
  };

  createUser = async (data: UserGoogleTreidi): Promise<UserGoogle> => {
    return await prisma.userGoogle.create({
      data,
    });
  };

  updateUser = async (
    email: string,
    data: UserGoogleTreidi
  ): Promise<UserGoogle> => {
    return await prisma.userGoogle.update({ where: { email }, data });
  };
}
