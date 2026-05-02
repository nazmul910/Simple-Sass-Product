import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @UseGuards(JwtGuard)
    @Get('me')
    async me(@Headers('authorization') auth:string){
        const token = auth.split(' ')[1];
        const deconded:any = jwt.verify(token,"SECRET_KEY");

        return this.usersService.getUserById(deconded.userId);
    }

    @UseGuards(JwtGuard)
    @Get()
    async all(@Headers('authorization') auth:string){
        const token = auth.split(' ')[1];
        const deconded:any = jwt.verify(token,"SECRET_KEY");

        return this.usersService.getUserByTenant(deconded.tenantId);
    }
}
