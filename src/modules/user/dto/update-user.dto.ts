
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class UpdateUserDto {
    constructor(email: string,lastName:string ,firstName: string ){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @IsEmail({}, { message: 'Email should be a valid email address' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsString({ message: 'Email must be a string' })
    @Transform(({ value }) => value.trim()) // Trim the email value
    email: string;

    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name should not be empty' })
    @Transform(({ value }) => value.trim()) // Trim the first name value
    firstName: string;

    @IsNotEmpty({ message: 'Last name should not be empty' })
    @IsString({ message: 'Last name must be a string' })
    @Transform(({ value }) => value.trim()) // Trim the last name value
    lastName: string;
}



    

