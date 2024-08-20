import { Injectable } from '@nestjs/common';
import { RemittancePGRepository } from "./remittance.pg.repository";
import { RemittanceRate, RemittanceBeneficiary } from "./dto/createRemittance.dto";

@Injectable()
export class RemittanceService {

    constructor(private remittancePGRepository: RemittancePGRepository) {}

    async getRemittance(pubIdRemittance: String) {
        return await this.remittancePGRepository.getRemittance(pubIdRemittance);
    }

    async createRemittance(clientId: number, idOriginCountry: number, idOriginCurrency: number, idOriginBank: number, idHolderBank: number, totalDeposited: number, totalComission: number, originRemittance: number, destinyRemittance: number, rate: RemittanceRate, idDestinyCountry: number, idDestinyCurrency: number, beneficiaries: RemittanceBeneficiary[], refNumber: String, urgent: boolean): Promise<any> {
        await this.remittancePGRepository.createRemittance(clientId, idOriginCountry, idOriginCurrency, idOriginBank, idHolderBank, totalDeposited, totalComission, originRemittance, destinyRemittance, rate, idDestinyCountry, idDestinyCurrency, beneficiaries, refNumber, urgent);
    }

}
