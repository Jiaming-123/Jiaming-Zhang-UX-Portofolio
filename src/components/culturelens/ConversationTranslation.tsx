import { cultureLensConversations } from '../../i18n/中文版'

// Reflow the translated transcript as a complete chat card, keeping text and
// rounded bubbles together at every size instead of masking the source image.
export default function ConversationTranslation({ file, alt }: { file: string; alt: string }) {
  const conversation = cultureLensConversations[file]
  return <figure className="culturelens-process-image culturelens-chat-translation" aria-label={alt}>
    {conversation.visitor && <div className="culturelens-chat-visitor">{conversation.visitor}</div>}
    <div className="culturelens-chat-guide">{conversation.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    {conversation.choices && <div className="culturelens-chat-choices">{conversation.choices.map(choice => <span key={choice}>{choice}</span>)}</div>}
  </figure>
}
