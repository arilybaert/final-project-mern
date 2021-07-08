import { default as mongoose, Schema, Document } from 'mongoose';
interface IFavorites extends Document {
    _id: string;
    teams: Object;
    _createdAt: Number;
    _modifiedAt: Number;
    _deletedAt: Number;

}

const favoritesSchema: Schema = new Schema ({
    _id: {type: String, required: true},
    teams: {
    },

    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
})

const Favorites = mongoose.model<IFavorites>('Favorites', favoritesSchema);



export { favoritesSchema, IFavorites, Favorites };