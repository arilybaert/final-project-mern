import { default as mongoose, Schema, Document } from 'mongoose';

interface IGameStats extends Document {
    _id: string;
    vTeam: Array<any>
    hTeam: Array<any>
};

const gameStatsSchema = new Schema ({
    _id: { type: String, required: true },
    vTeam: [{
        leaders: [{
            points: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                points: {type: String, required: true},
            }],
            rebounds: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                rebounds: {type: String, required: true},
            }],
            assists: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                assists: {type: String, required: true},
            }],
        }],
        activePlayers: [{
            _id: { type: String, required: true },
            teamId: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            points: { type: String, required: true },
            tpm: { type: String, required: true },
            assists: { type: String, required: true },
            rebounds: { type: String, required: true },
            fgp: { type: String, required: true },
            to: { type: String, required: true },
            stl: { type: String, required: true },
            blk: { type: String, required: true },
        }]
    }],
    hTeam: [{
        leaders: [{
            points: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                points: {type: String, required: true},
            }],
            rebounds: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                rebounds: {type: String, required: true},
            }],
            assists: [{
                _id: {type: String, required: true},
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                assists: {type: String, required: true},
            }],
        }],
        activePlayers: [{
            _id: { type: String, required: true },
            teamId: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            points: { type: String, required: true },
            tpm: { type: String, required: true },
            assists: { type: String, required: true },
            rebounds: { type: String, required: true },
            fgp: { type: String, required: true },
            to: { type: String, required: true },
            stl: { type: String, required: true },
            blk: { type: String, required: true },
        }]
    }]
},
{
    timestamps: true,
});

const GameStats = mongoose.model('GameStats', gameStatsSchema);

export {
    IGameStats,
    gameStatsSchema,
    GameStats,
}
;
