import prisma from "../../libs/Prisma";
import { User } from "@prisma/client";
import { UserTreidi } from "../../entities/Users/User.entities";

export class UserPrisma {
  findUser = async (query: UserTreidi): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: query.email } });
  };

  createUser = async (payload: UserTreidi): Promise<User> => {
    return await prisma.user.create({
      data: {
        name: payload.name,
        apellidos: payload.apellidos,
        email: payload.email,
        genero: payload.genero,
      },
    });
  };

  updateUser = async (id: number, data: UserTreidi): Promise<User> => {
    return await prisma.user.update({ where: { id }, data });
  };
}
