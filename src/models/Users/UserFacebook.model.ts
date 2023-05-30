import prisma from "../../libs/Prisma";
import { UserFacebook } from "@prisma/client";
import {
  UserFacebookTreidi,
  RequestUserFacebook,
} from "../../entities/Users/UserFacebook.entities";

export class UserFacebookPrisma {
  findUser = async (
    payload: RequestUserFacebook
  ): Promise<UserFacebook | null> => {
    return await prisma.userFacebook.findUnique({
      where: {
        idFacebook: payload.idFacebook,
      },
    });
  };

  findUserById = async (id: string): Promise<UserFacebook | null> => {
    return await prisma.userFacebook.findUnique({
      where: {
        idFacebook: id,
      },
    });
  };

  createUser = async (data: UserFacebookTreidi): Promise<UserFacebook> => {
    const { idFacebook, fullName, email, token } = data;
    const emailValue: string = email ?? "";
    return await prisma.userFacebook.create({
      data: {
        idFacebook,
        fullName,
        email: emailValue,
        token,
      },
    });
  };

  updateUser = async (id: number, email: string): Promise<UserFacebook> => {
    return await prisma.userFacebook.update({
      where: { id },
      data: { email: email },
    });
  };
}
