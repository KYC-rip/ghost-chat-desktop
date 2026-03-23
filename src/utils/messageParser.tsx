// Desktop-simplified message parser (no smart cards, just link detection)

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const parseSmartMessage = (content: string) => {
  if (!content) return null;

  if (!content.match(URL_REGEX)) return content;

  const parts = content.split(URL_REGEX);

  return parts.map((part, index) => {
    const match = part.match(URL_REGEX);

    if (match) {
      return (
        <a
          key={index}
          href={match[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xmr-green hover:underline break-all opacity-80 hover:opacity-100"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
