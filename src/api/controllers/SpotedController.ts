import { Controller, Get, Post, ClassErrorMiddleware, ClassWrapper, ClassMiddleware, Delete } from '@overnightjs/core';
import { Response } from 'express';
import { RequestAuth, authMiddleware } from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import { asyncWrapper } from '../middleware/asyncWrapper';
import SpotedService from '../../domain/services/SpotedService';
import { CreateReqSpotedDTO, GetReqSpotedDTO } from '../dtos/spoted';
import { Spoted } from '../../domain/entities/spoted';

@Controller('spoted')
@ClassErrorMiddleware(errorMiddleware)
@ClassWrapper(asyncWrapper)
@ClassMiddleware(authMiddleware)
export class SpotedController {
    spotedService: SpotedService = new SpotedService()

    @Post('/')
    private async create(req: RequestAuth, res: Response) {
        const spoted: CreateReqSpotedDTO = req.body
        const spotedCreated = await this.spotedService.createSpoted(spoted)
        res.send(spotedCreated)
    }

    @Get('/')
    private async get(req: RequestAuth, res: Response) {
        const { radius, fromUser, lat, log }: GetReqSpotedDTO = req.query as unknown as GetReqSpotedDTO
        const spoteds: Array<Spoted> = await this.spotedService.find({
            radius: radius || 10000,
            user: Boolean(fromUser) ? req.user.id : undefined,
            coordinates: [Number(lat), Number(log)]
        })
        res.send(spoteds)
    }

    @Delete(":id")
    private async delete(req: RequestAuth, res: Response) {
        const id = req.params.id
        const numberDeleted = await this.spotedService.delete({ id })
        res.send({
            numberDeleted
        })

    }
}