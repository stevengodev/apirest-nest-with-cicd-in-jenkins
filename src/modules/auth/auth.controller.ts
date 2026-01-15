import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        const { access_token } = await this.authService.signIn(loginDto.email, loginDto.password);
        return { access_token };
    }

    @Post('register')
    async signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.signUp(signUpDto);
    }


}
