import { IsString, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  readonly idUsuario: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly message: string;
}
