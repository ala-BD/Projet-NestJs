import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire.' })
  username: string;

  @IsEmail({}, { message: 'L’adresse email doit être valide.' })
  email: string;

  @IsNotEmpty({ message: 'Le statut est obligatoire.' })
  status: string;
}
