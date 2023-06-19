import prisma from "../../libs/Prisma";
import { UserFacebookTreidi } from "@src/entities/Users/UserFacebook.entities";
import { Session } from "@prisma/client";

export class UserFacebookPrisma {
  createUser = async (
    payload: UserFacebookTreidi,
    id?: number
  ): Promise<Session | null> => {
    return await prisma.session.create({
      data: {
        idFacebook: payload.idFacebook,
        token: payload.token,
        expiresAt: new Date(),
        provider: payload.provider,
        user: { connect: { id: id } }, // Establece un valor predeterminado para expiresAt o proporciona un valor válido según tus necesidades
      },
    });
  };

  findUserPassportService = async (payload: any): Promise<Session | null> => {
    return await prisma.session.findUnique({
      where: {
        idFacebook: payload.id,
      },
    });
  };

  findUser = async (payload: UserFacebookTreidi): Promise<Session | null> => {
    return await prisma.session.findUnique({
      where: {
        idFacebook: payload.idFacebook,
      },
    });
  };

  updateUser = async (
    idFacebook: string,
    token: string
  ): Promise<Session | null> => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);
    return await prisma.session.update({
      where: { idFacebook },
      data: {
        token: { push: token },
        expiresAt: expiresAt,
      },
    });
  };
}
