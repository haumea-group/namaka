
export interface CommentPost {
    id: string
    parentCommentId: undefined | string
    authorId: string
    topicId: string
    timePosted: number
    subject: string
    body: string
    rating?: number
}

export interface CommentPostDraft {
    parentCommentId: undefined | string
    topicId: string
    subject: string
    body: string
    rating?: number
}

export interface CommentEditDraft {
    id: string
    subject: string
    body: string
    rating?: number
}

export interface TopicStats {
    topicId: string
    numberOfRootComments: number
    numberOfReplyComments: number
    averageRating?: number
    ratingBreakdown?: number[]
}

export interface BanUser {
    userId: string
    until: number
}

export interface UnBanUser {
    userId: string
}

export interface CommentGet {
	topicId: string
	limit: number
	offset: number
}
