import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRemittanceDto } from "./dto/createRemittance.dto";
import { remittanceVerifyOriginDto } from "./dto/remittanceVerifyOrigin.dto";
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

    @Get('/data/:isoCodOrigin/:isoCodDestiny')
    @ApiOperation({ summary: 'Get the data to create a remittance' })
    @ApiResponse({ status: 200, description: 'Return all the data to create the remittance (banks, bank accounts, doc types, etc.)' })
    @ApiResponse({ status: 500, description: 'Server error' })
    async getRemittanceData(
        @Param('isoCodOrigin') isoCodOrigin: String,
        @Param('isoCodDestiny') isoCodDestiny: String,
    ) {
        return await this.remittanceService.getRemittanceData(isoCodOrigin, isoCodDestiny);
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

    @Patch('/:pubRemittanceId')
    @UsePipes(ValidationPipe)
    async remittanceVerifyOrigin(
        @Body() data: remittanceVerifyOriginDto
    ) {
        const resp = await this.remittanceService.remittanceVerifyOrigin(
            data.remittancePubID,
            data.verify,
            data.idBankAccount,
            data.transferName,
            data.dateReceived,
            data.verifNumber,
            data.confirmNumber
        );
        return {
            msg: "Remittance created"
        }
    }

}
