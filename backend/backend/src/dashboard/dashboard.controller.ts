import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService
    ){}

    @Post()
    @ApiOperation({ summary: 'Get dashboard data' })
    async dashboard(@Body() data: DashboardDto): Promise<any>{
        const result = await this.dashboardService.dashboard(data); // Just returning some dashboard data
        return result
    }
    
}
