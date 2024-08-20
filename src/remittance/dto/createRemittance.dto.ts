import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RemittanceBeneficiary {
    ownerName: String;
    identification: String;
    account: String;
    accountType: String;
    phoneNumber: String;
    email: String;
    partialAmount: number;
    idDestinyBank: number;
    idPayMethod: number;
    docType: number;
    relation: String;
}

export class RemittanceRate {
    idRate: number;
    rate: number;
    operation: String;
    rateName: String;
    typeName: String;
}

export class CreateRemittanceDto {
    
    @IsNumber()
    @IsNotEmpty()
    clientId: number;
        
    @IsNumber()
    @IsNotEmpty()
    idOriginCountry: number;
        
    @IsNumber()
    @IsNotEmpty()
    idOriginCurrency: number;
    
    @IsNumber()
    @IsNotEmpty()
    idOriginBank: number;
    
    @IsNumber()
    @IsNotEmpty()
    idHolderBank: number;
    
    @IsNumber()
    @IsNotEmpty()
    totalDeposited: number;
    
    @IsNumber()
    @IsNotEmpty()
    totalComission: number;
    
    @IsNumber()
    @IsNotEmpty()
    originRemittance: number;
    
    @IsNumber()
    @IsNotEmpty()
    destinyRemittance: number;
    
    @IsNotEmpty()
    rate: RemittanceRate;
    
    @IsNumber()
    @IsNotEmpty()
    idDestinyCountry: number;
    
    @IsNumber()
    @IsNotEmpty()
    idDestinyCurrency: number;
    
    @IsNotEmpty()
    beneficiaries: RemittanceBeneficiary[];
    
    @IsString()
    @IsNotEmpty()
    refNumber: String;

    @IsBoolean()
    urgent: boolean;
}