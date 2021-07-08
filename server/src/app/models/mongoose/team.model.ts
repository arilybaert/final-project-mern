import { default as mongoose, Schema, Document } from 'mongoose';

interface ITeam extends Document {
    _id: string;
    isNBAFranchise: Boolean;
    isAllStar: Boolean;
    city: string;
    altCityName: string;
    fullName: string;
    tricode: string;
    teamId: string;
    nickname: string;
    urlName: string;
    teamShortName: string;
    confName: string;
    divName: string;
    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
};

const teamSchema: Schema = new Schema ({
    _id: {type: String, required: true},
    isNBAFranchise: {type: Boolean, required: true},
    isAllStar: {type: Boolean, required: true},
    city: {type: String, required: true},
    altCityName: {type: String, required: true},
    fullName: {type: String, required: true},
    tricode: {type: String, required: true},
    teamId: {type: String, required: true},
    nickname: {type: String, required: true},
    urlName: {type: String, required: true},
    teamShortName: {type: String, required: true},
    confName: {type: String, required: true},
    divName: {type: String, required: false},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
});

const Team = mongoose.model<ITeam>('Team', teamSchema);

export {ITeam, Team, teamSchema};