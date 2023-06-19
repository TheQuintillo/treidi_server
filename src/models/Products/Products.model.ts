import prisma from "../../libs/Prisma";
import { Product } from "@prisma/client";
import { ProductsTreidi } from "../../entities/Products/Products.entities";

export class ProductsPrisma {
  findManyProducts = async (): Promise<Product[]> => {
    return prisma.product.findMany();
  };
}
