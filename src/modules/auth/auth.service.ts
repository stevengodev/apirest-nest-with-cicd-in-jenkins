import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string) {

        const user = await this.usersService.findByEmail(email);

        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }

    async signUp(userDto: CreateUserDto) {
        const user = await this.usersService.create(userDto);
        const { password, ...result } = user;
        return result;
    }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }




}
