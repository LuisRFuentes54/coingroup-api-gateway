import { DataSource } from 'typeorm';
import { RemittanceRate, RemittanceBeneficiary } from "./dto/createRemittance.dto";

export class RemittancePGRepository {

    constructor(private dataSource: DataSource) {
        this.dataSource = new DataSource({
            type: 'postgres',
            host: process.env.PG_DB_HOST,
            port: parseInt(process.env.PG_DB_PORT),
            username: process.env.PG_DB_USER,
            password: process.env.PG_DB_PASSWORD,
            database: process.env.PG_DB_NAME
        });
        this.dataSource.initialize()
    }
    
    async getRemittance(pubIdRemittance: String): Promise<any> {
        const resp = await this.dataSource.query(`
            select *
            from prc_mng.sp_process_get_info('${pubIdRemittance}') as remittance
        `);
        console.log(resp[0])
        return resp[0].remittance;
    }

    async getRemittanceData(isoCodOrigin: String, isoCodDestiny: String): Promise<any> {
        const resp = await this.dataSource.query(`
            select *
            from prc_mng.sp_get_remittance_data_to_third($1, $2) as data;
        `, [ isoCodOrigin, isoCodDestiny ]);
        return resp[0].data;
    }

    async createRemittance(clientId: number, rate: RemittanceRate, idCountryOrigin: number, idCountryDestiny: number, idCurrencyOrigin: number, idCurrencyDestiny: number, idBankAccount: number, depositAmount: number, commission: number, originAmount: number, destinyAmount: number, beneficiaries: RemittanceBeneficiary[], pathName: String, refNumber: String): Promise<any> {
        const resp = await this.dataSource.query(`
            select * from prc_mng.sp_third_party_init_remittances($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) as info;
        `, [
            clientId,
            rate.idRate,
            rate.factor,
            rate.operation,
            idCountryOrigin,
            idCountryDestiny,
            idCurrencyOrigin,
            idCurrencyDestiny,
            idBankAccount,
            depositAmount,
            commission,
            originAmount,
            destinyAmount,
            beneficiaries,
            pathName,
            refNumber
        ]);
        return resp[0].data;
    }
}