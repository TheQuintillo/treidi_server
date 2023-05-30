import prisma from "../../libs/Prisma";
import { UserGoogle } from "@prisma/client";
import {
  UserGoogleTreidi,
  FindUserGoogleTreidi,
  RequestUserGoogle,
} from "../../entities/Users/UserGoogle.entities";

export class UserGooglePrisma {
  findUser = async (payload: RequestUserGoogle): Promise<UserGoogle | null> => {
    return await prisma.userGoogle.findUnique({
      where: {
        email: payload.email,
      },
    });
  };

  createUser = async (data: UserGoogleTreidi): Promise<UserGoogle> => {
    return await prisma.userGoogle.create({
      data,
    });
  };

  updateUser = async (
    id: number,
    data: UserGoogleTreidi
  ): Promise<UserGoogle> => {
    return await prisma.userGoogle.update({ where: { id }, data });
  };
}
