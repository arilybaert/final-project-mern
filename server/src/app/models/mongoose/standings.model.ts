import { default as mongoose, Schema, Document } from 'mongoose';

interface IStandings extends Document {
    _id: string;
    allStandings: Array<any>;
    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
}

const standingsSchema = new Schema ({
    _id: { type: String, required: true },
    seasonYear: { type: Number, required: true },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: true, default: null },
    _deletedAt: { type: Number, required: true, default: null },
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
        _createdAt: { type: Number, required: true, default: Date.now() },
        _modifiedAt: { type: Number, required: true, default: null },
        _deletedAt: { type: Number, required: true, default: null },
        

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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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
            _createdAt: { type: Number, required: true, default: Date.now() },
            _modifiedAt: { type: Number, required: false, default: null },
            _deletedAt: { type: Number, required: false, default: null },
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