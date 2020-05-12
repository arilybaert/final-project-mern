import { default as mongoose, Schema, Document } from 'mongoose';
interface IGame extends Document {
    _id: string;
    isStartTimeTBD: Boolean;
    isGameActivated: Boolean;
    startTimeEastern: string;
    startDateEastern: string;
    startTimeISO: string;
    vTeamTricode: string;
    vTeamScore: string;
    vTeam: string;
    hTeam: string;
    hTeamTricode: string;
    hTeamScore: string;

}

const gameSchema: Schema = new Schema ({
    _id: {type: String, required: true},
    isStartTimeTBD: {type: Boolean, required: true},
    isGameActivated: {type: Boolean, required: true},
    startTimeEastern: {type: String, required: false},
    startDateEastern: {type: String, required: true},
    startTimeISO: {type: String, required: true},
    vTeamTricode: {type: String, required: true},
    vTeamScore: {type: String, required: true},
    vTeam: {type: String, required: true},
    hTeam: {type: String, required: true},
    hTeamTricode: {type: String, required: true},
    hTeamScore: {type: String, required: true},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
})

const Game = mongoose.model<IGame>('Game', gameSchema);

interface IGameDay extends Document {
    _id: string;
    games: Array<IGame>;
    _deletedAt: number;
}

const gameDaySchema: Schema = new Schema ({
    _id: {type: String, required: true},
    games: {type: Array, required: true},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
});

const GameDay = mongoose.model<IGameDay>('GameDay', gameDaySchema);

export { IGameDay, GameDay, gameDaySchema, IGame, Game };