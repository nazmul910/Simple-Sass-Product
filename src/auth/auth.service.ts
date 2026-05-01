import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {ConfigService} from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly config: ConfigService
    ){}
    

    // register

    async register(email:string,password:string){
        const exitingUser = await this.prisma.user.findUnique({
            where:{email}
        });

        if(exitingUser){
            throw new Error('User already exists');
        }

        const hashPassword = await bcrypt.hash(password,10);

        const tenant = await this.prisma.tenant.create({
            data:{
                name: email,
            }
        });

        const user = await this.prisma.user.create({
            data:{
                email,
                password: hashPassword,
                tenantId: tenant.id,
            }
        });

        return{
            message: "user registered successfully",
            user,
        }
    }

    // login

    async login(email:string,password:string){
        const user = await this.prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            throw new Error("Invalid email or password");;
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            {
                userId: user.id,
                tenantId: user.tenantId,
                plan: user.plan
            },
            "SECRET_KEY",
            {expiresIn: '7d'}
        );

        return{
            message:"Login successful",
            token,
            user,
        }
    }
}
