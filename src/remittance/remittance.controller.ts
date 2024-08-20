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
            data.idOriginCountry,
            data.idOriginCurrency,
            data.idOriginBank,
            data.idHolderBank,
            data.totalDeposited,
            data.totalComission,
            data.originRemittance,
            data.destinyRemittance,
            data.rate,
            data.idDestinyCountry,
            data.idDestinyCurrency,
            data.beneficiaries,
            data.refNumber,
            data.urgent
        );
        return {
            msg: "Remittance created"
        }
    }

}
