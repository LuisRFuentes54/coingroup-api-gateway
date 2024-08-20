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
            from prc_mng.lnk_cr_remittances
            where id_remittance_pub = '${pubIdRemittance}'
        `);
        return resp[0];
    }

    async createRemittance(clientId: number, idOriginCountry: number, idOriginCurrency: number, idOriginBank: number, idHolderBank: number, totalDeposited: number, totalComission: number, originRemittance: number, destinyRemittance: number, rate: RemittanceRate, idDestinyCountry: number, idDestinyCurrency: number, beneficiaries: RemittanceBeneficiary[], refNumber: String, urgent: boolean): Promise<any> {
        const resp = await this.dataSource.query(`
            select prc_mng.sp_sixmap_init_remittances($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) as info;
        `, [
            clientId,
            idOriginCountry,
            idDestinyCountry,
            idOriginCurrency,
            idDestinyCurrency,
            idHolderBank,
            totalDeposited,
            totalComission,
            originRemittance,
            destinyRemittance,
            rate.idRate,
            rate.typeName,
            beneficiaries,
            '/repo-cr/assets/1691187008314.jpg',
            refNumber,
            urgent,
            'adminsito',
            0
        ]);
        return resp[0];
    }
}