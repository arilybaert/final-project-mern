import { default as mongoose, Schema, Document } from 'mongoose';

interface IStandings extends Document {
    _id: string;
    allStandings: Array<any>;
}

const standingsSchema = new Schema ({
    _id: { type: String, required: true },
    seasonYear: { type: Number, required: true },
    allStandings: [{
        teamId: { type: String, required: true },
        win: { type: String, required: true },
        loss: { type: String, required: true },
        winPctV2: { type: String, required: true },
        teamName: { type: String, required: true },
        confRank: { type: Number, required: true },
        defaultOrder: {type: Number, required: true },
        teamCode: {type: String, required: true},
        teamNickname: {type: String, required: true},
    }],
    conferenceStandings: {
        east: [{
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            confRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        }],
        west: [{
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            confRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        }]
    },
    divisionStandings: {
        southeast: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
        atlantic: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
        central: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
        southwest: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
        pacific: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
        northwest: {
            teamId: { type: String, required: true },
            win: { type: String, required: true },
            loss: { type: String, required: true },
            winPctV2: { type: String, required: true },
            teamName: { type: String, required: true },
            divRank: { type: Number, required: true },
            teamCode: {type: String, required: true},
            teamNickname: {type: String, required: true},
        },
    }
},
{
    timestamps: true,
})

const Standings = mongoose.model('standings', standingsSchema);

export {
    IStandings,
    Standings,
    standingsSchema,
}