import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  readonly idUsuario: string;

  @IsString()
  readonly idAdministration: string;

  @IsString()
  readonly message: string;
}
