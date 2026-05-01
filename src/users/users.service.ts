import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getUserById(id:string){
        return this.prisma.user.findUnique({
            where:{id},
        });
    }

    async getUserByTenant(tenantId:string){
        return this.prisma.user.findMany({
            where:{tenantId},
        })
    }
}
