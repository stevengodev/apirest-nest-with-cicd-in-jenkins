import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// Pudo ser util para marcar las rutas que iban a ser publicas, pero con el echo de no colocar
// el @UseGuards(JwtAuthGuard) es suficiente