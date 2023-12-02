import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

interface StandingType {
    competitionId: number;
    drawn: number;
    form: Array<'W' | 'L' | 'D' | ''>;
    goalDiff: number;
    goalsConceded: number;
    goalsScored: number;
    groupId: number;
    groupName: string;
    lost: number;
    matches: number;
    name: string;
    points: number;
    rank: number;
    seasonId: number;
    stageId: number;
    stageName: string;
    teamId: number;
    won: number;
}
  
interface IStanding extends Document, Omit<StandingType, '_id'> {}

type StandingWithIdType = StandingType & { _id: Document['_id'] };
type StandingArrayWithIdType = StandingWithIdType[];

const StandingSchema = new Schema<IStanding & Document>({
    competitionId: { type: Number, required: true },
    drawn: { type: Number, required: true },
    form: [{ type: String, enum: ['W', 'L', 'D', ''] }],
    goalDiff: { type: Number, required: true },
    goalsConceded: { type: Number, required: true },
    goalsScored: { type: Number, required: true },
    groupId: { type: Number, required: true },
    groupName: { type: String, required: true },
    lost: { type: Number, required: true },
    matches: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    seasonId: { type: Number, required: true },
    stageId: { type: Number, required: true },
    stageName: { type: String, required: true },
    teamId: { type: Number, required: true },
    won: { type: Number, required: true }
});

StandingSchema.index({ competitionId: 1, groupId: 1, name:1 }, { unique: true });
const Standing: Model<IStanding> = mongoose.models.Standing || mongoose.model<IStanding>('Standing', StandingSchema);
export { Standing, StandingSchema };
export type { StandingType, StandingArrayWithIdType, StandingWithIdType, IStanding };
