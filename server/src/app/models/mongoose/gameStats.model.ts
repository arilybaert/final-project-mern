import { default as mongoose, Schema, Document } from 'mongoose';

interface IGameStats extends Document {
    _id: string;
    vTeam: object;
    hTeam: object;
};

const gameStatsSchema = new Schema ({
    _id: { type: String, required: true },
    status: { type: String, required: true },
    startTimeUTC: { type: String, required: true },
    startTimeEastern: { type: String, required: true },
    isStartTimeTBD: { type: Boolean, required: true },
    vTeamScore: { type: String, required: false },
    hTeamScore: { type: String, required: false },
    vTeam: {
        triCode: { type: String, required: true },
        leaders: {
            points: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                points: {type: String, required: false},
            },
            rebounds: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                rebounds: {type: String, required: false},
            },
            assists: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                assists: {type: String, required: false},
            },
        },
        activePlayers: [{
            _id: { type: String, required: false },
            teamId: { type: String, required: false },
            firstName: { type: String, required: false },
            lastName: { type: String, required: false },
            points: { type: Number, required: false },
            tpm: { type: String, required: false },
            assists: { type: String, required: false },
            rebounds: { type: String, required: false },
            fgp: { type: String, required: false },
            to: { type: String, required: false },
            stl: { type: String, required: false },
            blk: { type: String, required: false },
        }]
    },
    hTeam: {
        triCode: { type: String, required: true },
        leaders: {
            points: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                points: {type: String, required: false},
            },
            rebounds: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                rebounds: {type: String, required: false},
            },
            assists: {
                _id: {type: String, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                assists: {type: String, required: false},
            },
        },
        activePlayers: [{
            _id: { type: String, required: false },
            teamId: { type: String, required: false },
            firstName: { type: String, required: false },
            lastName: { type: String, required: false },
            points: { type: Number, required: false },
            tpm: { type: String, required: false },
            assists: { type: String, required: false },
            rebounds: { type: String, required: false },
            fgp: { type: String, required: false },
            to: { type: String, required: false },
            stl: { type: String, required: false },
            blk: { type: String, required: false },
        }]
    }
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
