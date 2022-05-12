
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

export interface Score {
	id: string
	commentId: string
	aspect: string
	score: number
}

export interface ScoreDraft {
	aspect: string
	score: number
}

export interface CommentPostDraft {
	parentCommentId: undefined | string
	topicId: string
	subject: string
	body: string
	scores?: ScoreDraft[]
}

export interface CommentEditDraft {
	id: string
	subject: string
	body: string
	scores?: ScoreDraft[]
}

export interface TopicStats {
	topicId: string
	numberOfRootComments: number
	numberOfReplyComments: number
	scoring?: {
		averageScore: number
		averageScoreBreakdown: number[]
		scoreAspectAverages: {[key: string]: number}
	}
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
