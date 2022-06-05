import * as dbmage from "dbmage";
export declare type AppSchema = dbmage.AsSchema<{
    comments: CommentRow;
    scores: ScoreRow;
    bans: BanRow;
}>;
export declare type AppDatabase = dbmage.Database<AppSchema>;
export declare const databaseShape: dbmage.SchemaToShape<AppSchema>;
export declare type CommentRow = dbmage.AsRow<{
    id: dbmage.Id;
    parentCommentId: null | dbmage.Id;
    authorId: dbmage.Id;
    topicId: dbmage.Id;
    timePosted: number;
    subject: string;
    body: string;
    archived: boolean;
}>;
export declare type ScoreRow = dbmage.AsRow<{
    id: dbmage.Id;
    topicId: dbmage.Id;
    commentId: dbmage.Id;
    aspect: string;
    score: number;
    archived: boolean;
}>;
export declare type BanRow = dbmage.AsRow<{
    userId: dbmage.Id;
    reason: string;
    until: number;
}>;
