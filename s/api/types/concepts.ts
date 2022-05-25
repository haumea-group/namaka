
export interface CommentPost {
	id: string
	topicId: string
	parentCommentId: undefined | string
	authorId: string
	timePosted: number
	subject: string
	body: string
	archived: boolean
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

export interface BanDraft {
	reason: string
	until: number
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

export interface BoardScoringStats {
	averageScore: number
	averageScoreBreakdown: number[]
	scoreAspectAverages: {[key: string]: number}
}

export interface TopicStats {
	topicId: string
	numberOfRootComments: number
	numberOfReplyComments: number
	scoring?: BoardScoringStats
}

export interface BanParams {
	userId: string
	until: number
	reason: string
}

export interface UnbanParams {
	userId: string
}

export interface FetchThreadsParams {
	topicId: string
	limit: number
	offset: number
}

export interface ListBansParams {
	limit: number
	offset: number
}

export interface FetchBanParams {
	userId: string
}

export interface Ban {
	reason: string
	userId: string
	until: number
}
