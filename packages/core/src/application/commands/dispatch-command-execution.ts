import type {
  CommandExecutionPort,
  CommandExecutionResult,
  CommandItem
} from "../../domain/commands/types";

import { executeCommand } from "./execute-command";

export async function dispatchCommandExecution({
  item,
  port
}: {
  item: CommandItem | undefined;
  port?: CommandExecutionPort;
}): Promise<CommandExecutionResult> {
  const result = executeCommand(item);

  if (!item || result.type === "noop") {
    return result;
  }

  if (result.type === "navigate") {
    await port?.navigate?.({
      item,
      sections: result.sections,
      title: result.title
    });
    return result;
  }

  if (result.type === "href") {
    await port?.openHref?.({
      item,
      href: result.href
    });
    return result;
  }

  await port?.runCallback?.({
    item,
    callback: result.callback
  });

  return result;
}
