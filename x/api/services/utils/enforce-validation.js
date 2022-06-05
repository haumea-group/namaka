import { ApiError } from "renraku";
export function enforceValidation(data, validator) {
    const problems = validator(data);
    if (problems.length) {
        const message = problems.join("; ");
        throw new ApiError(400, `validation error - ${message}`);
    }
    else {
        return data;
    }
}
//# sourceMappingURL=enforce-validation.js.map