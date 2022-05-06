
export interface AuthDevice {
	login(): Promise<void>
	logout(): Promise<void>
}
