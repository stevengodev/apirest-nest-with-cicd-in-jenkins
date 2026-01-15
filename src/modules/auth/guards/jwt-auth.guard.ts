import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JWT Auth Guard que utiliza la estrategia 'jwt' definida previamente

/*

Para que JwtStrategy entre en acción, necesitas realizar tres pasos clave: 
registrarla, activarla con un Guard y aplicarla en tus controladores.

*/

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
}