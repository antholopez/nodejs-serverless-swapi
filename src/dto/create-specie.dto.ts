import { IsArray, IsNumberString, IsString, IsUrl } from "class-validator";

export class CreateSpecieDto {
  @IsString({ message: "name debe de ser una cadena." })
  name: string;

  @IsString({ message: "classification debe de ser una cadena." })
  classification: string;

  @IsString({ message: "designation debe de ser una cadena." })
  designation: string;

  @IsNumberString({ message: "average_height debe de ser una cadena." })
  average_height: string;

  @IsString({ message: "skin_colors debe de ser una cadena." })
  skin_colors: string;

  @IsString({ message: "hair_colors debe de ser una cadena." })
  hair_colors: string;

  @IsString({ message: "eye_colors debe de ser una cadena." })
  eye_colors: string;

  @IsNumberString({ message: "average_lifespan debe de ser una cadena." })
  average_lifespan: string;

  @IsString({ message: "homeworld debe de ser una cadena." })
  homeworld: string;

  @IsString({ message: "language debe de ser una cadena." })
  language: string;

  @IsArray({ message: "people debe de ser un arreglo." })
  people: string[];

  @IsArray({ message: "films debe de ser un arreglo." })
  films: string[];

  @IsUrl({ }, { message: "url debe de ser un url" })
  url: string;
}
