import { RiskRule } from "../types/rule.types";

export class RuleRegistry {
  private readonly rules = new Map<string, RiskRule>();

  register(rule: RiskRule): void {
    const id = rule.name;

    if (this.rules.has(id)) {
      throw new Error(`Rule '${id}' is already registered.`);
    }

    this.rules.set(id, rule);
  }

  unregister(ruleId: string): void {
    this.rules.delete(ruleId);
  }

  getRule(ruleId: string): RiskRule | undefined {
    return this.rules.get(ruleId);
  }

  hasRule(ruleId: string): boolean {
    return this.rules.has(ruleId);
  }

  getAllRules(): RiskRule[] {
    return [...this.rules.values()];
  }

  clear(): void {
    this.rules.clear();
  }

  size(): number {
    return this.rules.size;
  }
}
