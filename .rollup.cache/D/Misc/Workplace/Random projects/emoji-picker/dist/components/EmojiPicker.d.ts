import React from 'react';
export declare const emojiDelimeter = ":";
export interface Emoji {
    url: string;
    aliases: Array<string>;
}
export interface SimpleEmojis {
    [name: string]: string;
}
export interface EmojisByName {
    [name: string]: Emoji;
}
export declare type IEmojiGroup = {
    [name: string]: EmojisByName;
};
export interface EmojiPickerProps {
    emojiByGroup: IEmojiGroup;
    className?: string;
    onEmojiSelected: (emojiName: string) => void;
}
export declare const wrapEmoji: (emojiName: string) => string;
export declare const simplifyEmojis: (emojiByGroup: IEmojiGroup) => SimpleEmojis;
export declare const emojify: (emojis: SimpleEmojis, message: string) => string;
export declare const filterEmojiGroups: (emojiByGroup: IEmojiGroup, filter: string) => IEmojiGroup;
declare const EmojiPicker: React.FC<EmojiPickerProps>;
export { EmojiPicker };
