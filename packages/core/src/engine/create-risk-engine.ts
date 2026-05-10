import { calculateRisk } from "./risk-engine";

import { RiskPlugin } from "../types/plugin.types";

import { LoanApplicant } from "../types/risk.types";

import { RiskConfig } from "../types/risk-config.types";

import { RiskRule } from "../types/rule.types";

import {
  EngineHooks,
  HookContext,
} from "../types/hook.types";

export function createRiskEngine() {

  const plugins: RiskPlugin[] = [];

  const customRules: RiskRule[] = [];

  const hooks: EngineHooks = {};

  return {

    // =========================
    // REGISTER PLUGIN
    // =========================

    use(plugin: RiskPlugin) {

      plugins.push(plugin);

      if (plugin.rules) {

        customRules.push(
          ...plugin.rules
        );
      }

      return this;
    },

    // =========================
    // REGISTER HOOKS
    // =========================

    setHooks(
      engineHooks: EngineHooks
    ) {

      hooks.beforeCalculate =
        engineHooks.beforeCalculate;

      hooks.afterCalculate =
        engineHooks.afterCalculate;

      return this;
    },

    // =========================
    // ANALYZE
    // =========================

    async analyze(
      applicant: LoanApplicant,

      config?: RiskConfig
    ) {

      // BEFORE HOOK
      if (
        hooks.beforeCalculate
      ) {

        const beforeContext: HookContext = {
          applicant,

          config:
            config as RiskConfig,
        };

        await hooks.beforeCalculate(
          beforeContext
        );
      }

      // MAIN ENGINE
      const result =
        await calculateRisk(
          applicant,

          config,

          {
            customRules,

            hooks,
          }
        );

      // AFTER HOOK
      if (
        hooks.afterCalculate
      ) {

        const afterContext: HookContext = {
          applicant,

          config:
            config as RiskConfig,

          result,
        };

        await hooks.afterCalculate(
          afterContext
        );
      }

      return result;
    },

    // =========================
    // GET PLUGINS
    // =========================

    getPlugins() {

      return plugins;
    },
  };
}