export const HELP_MESSAGE = `
[ COMMAND LIST ]
----------------
/enc <msg>            : Encrypt & Copy (Manual Mode)
/handshake            : Send Handshake packet
/clear                : Clear Screen
/?                    : Show this help
`;

export const processSlashCommands = async (text: string): Promise<string | undefined> => {
  const cleanText = text.trim();

  // Desktop app: simplified slash commands (no dead drop, no swap, no invoice)
  // Those features are available on the web at walls.rip

  if (cleanText.toLowerCase() === '/help' || cleanText === '/?') {
    return undefined; // handled upstream
  }

  return text;
};
