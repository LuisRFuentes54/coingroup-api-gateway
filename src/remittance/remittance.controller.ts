import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRemittanceDto } from "./dto/createRemittance.dto";
import { RemittanceService } from "./remittance.service";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('remittance')
@ApiTags('Remittance')
export class RemittanceController {

    constructor(private remittanceService: RemittanceService) {}

    @Get('/:pubRemittanceId')
    @ApiOperation({ summary: 'Get a remittance' })
    @ApiResponse({ status: 200, description: 'Return a remittance' })
    @ApiResponse({ status: 500, description: 'Server error' })
    async getRemittance(
        @Param('pubRemittanceId') pubIdRemittance: String
    ) {
        return await this.remittanceService.getRemittance(pubIdRemittance);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    async initRemittance(
        @Body() data: CreateRemittanceDto
    ) {
        await this.remittanceService.createRemittance(
            data.clientId,
            data.rate,
            data.idCountryOrigin,
            data.idCountryDestiny,
            data.idCurrencyOrigin,
            data.idCurrencyDestiny,
            data.idBankAccount,
            data.depositAmount,
            data.commission,
            data.originAmount,
            data.destinyAmount,
            data.beneficiaries,
            '/repo-cr/assets/1691187008314.jpg',
            data.refNumber
        );
        return {
            msg: "Remittance created"
        }
    }

}
