import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRemittanceDto } from "./dto/createRemittance.dto";
import { RemittanceService } from "./remittance.service";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToClass } from 'class-transformer';

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
    @UseInterceptors(FileInterceptor('receipt'))
    @UsePipes(ValidationPipe)
    async initRemittance(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: any
    ) {

        const remittanceInfo = plainToClass(CreateRemittanceDto, JSON.parse(data.remittanceInfo));
        const remittance = await this.remittanceService.createRemittance(
            remittanceInfo.clientId,
            remittanceInfo.rate,
            remittanceInfo.idCountryOrigin,
            remittanceInfo.idCountryDestiny,
            remittanceInfo.idCurrencyOrigin,
            remittanceInfo.idCurrencyDestiny,
            remittanceInfo.idBankAccount,
            remittanceInfo.depositAmount,
            remittanceInfo.commission,
            remittanceInfo.originAmount,
            remittanceInfo.destinyAmount,
            remittanceInfo.beneficiaries,
            '/repo-cr/assets/1691187008314.jpg',
            remittanceInfo.refNumber
        );

        return {
            msg: "Remittance created"
        }
    }

}
