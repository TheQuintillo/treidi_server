import { UserTreidi } from "@src/entities/Users/User.entities";
import prisma from "../../libs/Prisma";
import { User } from "@prisma/client";

export class UserPrisma {
  createUser = async (payload: UserTreidi): Promise<User | null> => {
    return await prisma.user.create({
      data: {
        nombre: payload.nombre,
        email: payload.email,
        apellidos: payload.apellidos,
        genero: payload.genero,
        setUser: true,
      },
    });
  };
  findUser = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  findUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  updateGuide = async (id: number): Promise<User | null> => {
    return await prisma.user.update({
      where: { id },
      data: { guide: true },
    });
  };
}
