
export interface CommentPost {
	archived: boolean
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
