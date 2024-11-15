import { Injectable } from '@nestjs/common';
import { RemittancePGRepository } from "./remittance.pg.repository";
import { RemittanceRate, RemittanceBeneficiary } from "./dto/createRemittance.dto";

@Injectable()
export class RemittanceService {

    constructor(private remittancePGRepository: RemittancePGRepository) {}

    async getRemittance(pubIdRemittance: String): Promise<any> {
        return await this.remittancePGRepository.getRemittance(pubIdRemittance);
    }

    async getRemittanceData(isoCodOrigin: String, isoCodDestiny: String): Promise<any> {
        return await this.remittancePGRepository.getRemittanceData(isoCodOrigin, isoCodDestiny);
    }

    async createRemittance(
        clientId: number,
        rate: RemittanceRate,
        idCountryOrigin: number,
        idCountryDestiny: number,
        idCurrencyOrigin: number,
        idCurrencyDestiny: number,
        idBankAccount: number,
        depositAmount: number,
        commission: number,
        originAmount: number,
        destinyAmount: number,
        beneficiaries: RemittanceBeneficiary[],
        pathName: String,
        refNumber: String
    ): Promise<any> {
        const resp = await this.remittancePGRepository.createRemittance(clientId, rate, idCountryOrigin, idCountryDestiny, idCurrencyOrigin, idCurrencyDestiny, idBankAccount, depositAmount, commission, originAmount, destinyAmount, beneficiaries, pathName, refNumber);
        return resp;
    }

}
