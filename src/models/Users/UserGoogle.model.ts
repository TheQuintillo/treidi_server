import prisma from "../../libs/Prisma";
import { UserGoogleTreidi } from "../../entities/Users/UserGoogle.entities";
import { Session } from "@prisma/client";

export class UserGooglePrisma {
  createUser = async (
    payload: UserGoogleTreidi,
    id?: number
  ): Promise<Session | null> => {
    return await prisma.session.create({
      data: {
        idGoogle: payload.idGoogle,
        token: payload.token,
        expiresAt: new Date(),
        provider: payload.provider,
        user: { connect: { id: id } }, // Establece un valor predeterminado para expiresAt o proporciona un valor válido según tus necesidades
      },
    });
  };

  findUser = async (payload: any): Promise<Session | null> => {
    return await prisma.session.findUnique({
      where: {
        idGoogle: payload.idGoogle,
      },
    });
  };

  updateUser = async (
    idGoogle: string,
    token: string
  ): Promise<Session | null> => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);
    return await prisma.session.update({
      where: { idGoogle },
      data: {
        token: { push: token },
        expiresAt: expiresAt,
      },
    });
  };
}
