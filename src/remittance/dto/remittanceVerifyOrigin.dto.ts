import { IsNumber, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class remittanceVerifyOriginDto {
    
    @IsNotEmpty()
    @IsString()
    remittancePubID: String; 
    
    @IsNotEmpty()
    @IsBoolean()
    verify: boolean; 
    
    @IsNotEmpty()
    @IsNumber()
    idBankAccount: number; 
    
    @IsNotEmpty()
    @IsString()
    transferName: String; 
    
    @IsNotEmpty()
    @IsNumber()
    dateReceived: number; 
    
    @IsNotEmpty()
    @IsString()
    verifNumber: String; 
    
    @IsNotEmpty()
    @IsString()
    confirmNumber: String
}

