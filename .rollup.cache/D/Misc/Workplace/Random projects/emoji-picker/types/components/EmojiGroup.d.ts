import React from 'react';
import { Emoji, EmojisByName } from './EmojiPicker';
export interface EmojiGroupProps {
    name: string;
    onEmojiSelected: (emojiName: string) => void;
    onHover: (emojiName: string, emoji: Emoji) => void;
    filter: string;
    emojis: EmojisByName;
}
declare const EmojiGroup: React.FC<EmojiGroupProps>;
export default EmojiGroup;
