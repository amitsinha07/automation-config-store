import MockRunner, {
	MockPlaygroundConfigType,
} from "@ondc/automation-mock-runner";
import { MockAction, MockOutput, saveType } from "./mock-action";
import logger from "@ondc/automation-logger";
import { RedisService } from "ondc-automation-cache-lib";
export type MockSessionData = any;

export const actionConfig: any = {
	codes: [],
};

export const defaultSessionData = () => ({ session_data: {} });

export async function generateMockResponse(
	session_id: string,
	sessionData: any,
	action_id: string,
	input?: any
) {
	const mockAction = await getMockActionObject(action_id, session_id);
	sessionData.user_input = input || {};
	const res = await mockAction.generator({}, sessionData);
	return res;
}

export async function getMockActionObject(
	actionId: string,
	sessionId?: string
): Promise<MockAction> {
	if (!sessionId) {
		throw new Error("Session not provided for getting mock action object");
	}
	const playgroundConfig = await loadPlaygroundConfig(sessionId);
	return new ConfigAction(playgroundConfig, actionId);
}

export function getUiMetaKeys() {
	return [];
}

async function loadPlaygroundConfig(
	sessionId: string
): Promise<MockPlaygroundConfigType> {
	const data = await RedisService.getKey(`PLAYGROUND_${sessionId}`);
	if (!data) {
		throw new Error(`No playground config found for session ID: ${sessionId}`);
	}
	return JSON.parse(data) as MockPlaygroundConfigType;
}

class ConfigAction implements MockAction {
	playgroundConfig: MockPlaygroundConfigType;
	actionId: string;
	step: MockPlaygroundConfigType["steps"][0];
	runner: MockRunner;
	constructor(playgroundConfig: MockPlaygroundConfigType, actionId: string) {
		this.runner = new MockRunner(playgroundConfig);
		this.playgroundConfig = playgroundConfig;
		if (
			playgroundConfig.steps.findIndex(
				(step) => step.action_id === actionId
			) === -1
		) {
			throw new Error(`Action ID ${actionId} not found in playground config`);
		}
		this.actionId = actionId;
		this.step = playgroundConfig.steps.find(
			(step) => step.action_id === actionId
		)!;
	}
	name(): string {
		return this.actionId;
	}
	get description(): string {
		return this.step.description;
	}
	async generator(_: any, sessionData: MockSessionData): Promise<any> {
		const res = await this.runner.runGeneratePayloadWithSession(
			this.actionId,
			sessionData
		);
		if (res.error) {
			logger.error("Error in generating payload", { res });
		}
		return res.result;
	}
	async validate(
		targetPayload: any,
		sessionData?: MockSessionData
	): Promise<MockOutput> {
		const res = await this.runner.runValidatePayloadWithSession(
			this.actionId,
			targetPayload,
			sessionData
		);
		if (res.error) {
			logger.error("Error in validating payload", { res });
		}
		return res.result ?? { success: false, message: "Validation failed" };
	}
	async meetRequirements(sessionData: MockSessionData): Promise<MockOutput> {
		const res = await this.runner.runGeneratePayloadWithSession(
			this.actionId,
			sessionData
		);
		if (res.error) {
			logger.error("Error in checking requirements", { res });
		}
		return res.result ?? { success: false, message: "Requirements not met" };
	}
	get saveData(): saveType {
		return {
			"save-data": this.step.mock.saveData || {},
		};
	}
	__forceSaveData(sessionData: MockSessionData): Promise<Record<string, any>> {
		throw new Error("Method not implemented.");
	}
	get defaultData(): any {
		return (
			this.step.mock.defaultPayload.message ??
			this.step.mock.defaultPayload.error ??
			{}
		);
	}
	get inputs(): any {
		return this.step.mock.inputs;
	}
	public get mockActionConfig(): {
		name: string;
		description: string;
		inputs: any;
		saveData: saveType;
	} {
		throw new Error("Method not implemented.");
	}
}
