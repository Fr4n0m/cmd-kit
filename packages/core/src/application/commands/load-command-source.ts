import type {
  CommandKitConfig,
  CommandSourcePayload
} from "../../domain/commands/types";

export async function loadCommandSource(
  config: CommandKitConfig
): Promise<CommandSourcePayload> {
  if (!config.source) {
    return {
      items: config.items,
      sections: config.sections
    };
  }

  if (typeof config.source === "function") {
    return config.source();
  }

  return config.source;
}
