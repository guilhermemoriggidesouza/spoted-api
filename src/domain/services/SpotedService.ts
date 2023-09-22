import { CreateResSpotedDTO, CreateReqSpotedDTO } from '../../api/dtos/spoted';
import { collections } from '../../mongodb';
import { Spoted } from '../entities/spoted';

export default class SpotedService {
    public async createSpoted(spotedDTO: CreateReqSpotedDTO): Promise<CreateResSpotedDTO> {
        const spoted: Spoted = new Spoted(
            spotedDTO.title,
            spotedDTO.description,
            spotedDTO.userId,
            new Date(),
            {
                type: "Point", coordinates: [spotedDTO.lat, spotedDTO.log],
            },
        );
        await collections.spoted?.insertOne(spoted)
        return { id: spoted.id! }
    }

    public milesToRadian(miles: number) {
        var earthRadiusInMiles = 3959;
        return miles / earthRadiusInMiles;
    }

    public async find({ radius, user, coordinates }: { radius: number, user?: string, coordinates: Array<number> }): Promise<Array<Spoted>> {
        var query: any = {
            "loc": !user && {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates
                    },
                    $maxDistance: radius
                }
            }
        };
        if (user) {
            query.userId = user
        }
        const spoteds = (await collections.spoted?.find(query).toArray()) as Array<Spoted>
        return spoteds
    }

    public async delete({ id }: { id: string }): Promise<number> {
        const result = await collections.spoted?.deleteOne({ id })
        return result!.deletedCount
    }
}