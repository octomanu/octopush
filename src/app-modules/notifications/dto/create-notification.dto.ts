import { IsString, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  readonly idUsuario: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly message: string;
}
