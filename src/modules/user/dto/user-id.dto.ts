import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsNumber, IsPositive } from 'class-validator';

export class UserIdDto {
    constructor(user_id:number){
        this.user_id = user_id;
    }
	@ApiProperty({ example: 36 })
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	@IsPositive()
	user_id: number;
}