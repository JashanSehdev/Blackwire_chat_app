import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 character long' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long' })
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
    message:
      'Username must start with a letter and contain only letters, numbers, and underscores',
  })
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
