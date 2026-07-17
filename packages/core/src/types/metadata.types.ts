/**
 * Rule categories supported by the framework.
 */
export enum RuleCategory {
  ELIGIBILITY = "ELIGIBILITY",

  CREDIT = "CREDIT",

  EMPLOYMENT = "EMPLOYMENT",

  AFFORDABILITY = "AFFORDABILITY",

  FRAUD = "FRAUD",

  COMPLIANCE = "COMPLIANCE",

  CUSTOM = "CUSTOM",
}

/**
 * Risk severity.
 */
export enum RuleSeverity {
  LOW = "LOW",

  MEDIUM = "MEDIUM",

  HIGH = "HIGH",

  CRITICAL = "CRITICAL",
}

/**
 * Rule maturity.
 */
export enum RuleStatus {
  STABLE = "STABLE",

  BETA = "BETA",

  EXPERIMENTAL = "EXPERIMENTAL",

  DEPRECATED = "DEPRECATED",
}

/**
 * Metadata every rule must expose.
 */
export interface RuleMetadata {
  /**
   * Unique identifier.
   *
   * Example:
   * age.minimum
   */
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Description.
   */
  description: string;

  /**
   * Rule category.
   */
  category: RuleCategory;

  /**
   * Risk severity.
   */
  severity: RuleSeverity;

  /**
   * Version.
   */
  version: string;

  /**
   * Enabled by default.
   */
  enabled: boolean;

  /**
   * Risk weight.
   */
  weight: number;

  /**
   * RBI / compliance tags.
   */
  tags: string[];

  /**
   * Current lifecycle.
   */
  status: RuleStatus;
}
