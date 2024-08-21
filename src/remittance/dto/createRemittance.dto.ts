import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class RemittanceBeneficiary {
    
    @IsNotEmpty()
    @IsString()
    ownerName: String;
    
    @IsNotEmpty()
    @IsString()
    identification: String;
    
    @IsNotEmpty()
    @IsString()
    account: String;
    
    @IsNotEmpty()
    @IsString()
    accountType: String;
    
    @IsNotEmpty()
    @IsString()
    phoneNumber: String;
    
    @IsNotEmpty()
    @IsString()
    email: String;
    
    @IsNotEmpty()
    @IsNumber()
    partialAmount: number;
    
    @IsNotEmpty()
    @IsNumber()
    idDestinyBank: number;
    
    @IsNotEmpty()
    @IsNumber()
    idPayMethod: number;
    
    @IsNotEmpty()
    @IsNumber()
    docType: number;
    
    @IsNotEmpty()
    @IsString()
    relation: String;
}

export class RemittanceRate {
    
    @IsNumber()
    idRate: number;
    
    @IsNumber()
    factor: number;
    
    @IsString()
    operation: String;
}

export class CreateRemittanceDto {

    @IsNotEmpty()
    @IsNumber()
    clientId: number;
    
    @IsNotEmpty()
    rate: RemittanceRate;
    
    @IsNotEmpty()
    @IsNumber()
    idCountryOrigin: number;
    
    @IsNotEmpty()
    @IsNumber()
    idCountryDestiny: number;
    
    @IsNotEmpty()
    @IsNumber()
    idCurrencyOrigin: number;
    
    @IsNotEmpty()
    @IsNumber()
    idCurrencyDestiny: number;
    
    @IsNotEmpty()
    @IsNumber()
    idBankAccount: number;
    
    @IsNotEmpty()
    @IsNumber()
    depositAmount: number;
    
    @IsNotEmpty()
    @IsNumber()
    commission: number;
    
    @IsNotEmpty()
    @IsNumber()
    originAmount: number;
    
    @IsNotEmpty()
    @IsNumber()
    destinyAmount: number;
    
    @IsNotEmpty()
    beneficiaries: RemittanceBeneficiary[];
    
    @IsNotEmpty()
    @IsString()
    refNumber: String;
}