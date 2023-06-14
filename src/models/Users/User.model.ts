import { Prisma } from "@prisma/client";
import prisma from "../../libs/Prisma";
import { User } from "@prisma/client";
import { UserTreidi } from "../../entities/Users/User.entities";

export class UserPrisma {
  findUserEmail = async (payload: UserTreidi): Promise<User | null> => {
    if (typeof payload === "string") {
      return await prisma.user.findUnique({ where: { email: payload } });
    } else {
      return await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
    }
  };

  findUserIdGoogle = async (query: UserTreidi): Promise<User | null> => {
    if (typeof query === "string") {
      return await prisma.user.findUnique({
        where: { idGoogle: query },
      });
    } else {
      return await prisma.user.findUnique({
        where: {
          idGoogle: query.idGoogle,
        },
      });
    }
  };

  findUserId = async (payload: UserTreidi): Promise<User | null> => {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { idFacebook: payload.idFacebook },
          { idGoogle: payload.idGoogle },
        ],
      },
    });
  };

  findUserIdFacebook = async (query: UserTreidi): Promise<User | null> => {
    if (typeof query === "string") {
      return await prisma.user.findUnique({
        where: { idFacebook: query },
      });
    } else {
      return await prisma.user.findUnique({
        where: {
          idFacebook: query.idFacebook,
        },
      });
    }
  };

  createUser = async (payload: UserTreidi): Promise<User> => {
    return await prisma.user.create({
      data: payload,
    });
  };

  updateUserGoogle = async (id: string, data: UserTreidi): Promise<User> => {
    return await prisma.user.update({ where: { idGoogle: id }, data: data });
  };

  updateUser = async (email: string, data: UserTreidi): Promise<User> => {
    return await prisma.user.update({ where: { email }, data: data });
  };

  updateUserFirst = async (
    payload: UserTreidi,
    data: UserTreidi
  ): Promise<User> => {
    return await prisma.user
      .findFirst({
        where: {
          OR: [
            { idFacebook: payload.idFacebook },
            { idGoogle: payload.idGoogle },
          ],
        },
      })
      .then((user) => {
        if (user?.idFacebook) {
          return prisma.user.update({
            where: { idFacebook: user.idFacebook },
            data,
          });
        } else if (user?.idGoogle) {
          return prisma.user.update({
            where: { idGoogle: user.idGoogle },
            data,
          });
        } else {
          throw new Error("User not found");
        }
      });
  };

  updateUserFacebook = async (id: string, data: UserTreidi): Promise<User> => {
    return await prisma.user.update({ where: { idFacebook: id }, data: data });
  };
  updateGuide = async (id: number): Promise<User> => {
    return await prisma.user.update({
      where: { id },
      data: { guide: true } as Prisma.UserGoogleUpdateInput,
    });
  };
}
