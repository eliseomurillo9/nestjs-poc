import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client.js";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PrismaConfig {
    private adapter: PrismaPg

    constructor() {
        Logger.log(process.env.DATABASE_URL)
        this.adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    }


    client = () => new PrismaClient({ adapter: this.adapter })
}