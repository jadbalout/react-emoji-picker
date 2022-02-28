import React from 'react';
import styles from './emoji-picker.module.css';
import {Emoji, EmojisByName} from './EmojiPicker';

export interface EmojiGroupProps {
    name: string, //group name
    onEmojiSelected: (emojiName: string) => void,
    onHover: (emojiName: string, emoji: Emoji) => void,
    filter: string,
    emojis: EmojisByName
}

const EmojiGroup: React.FC<EmojiGroupProps> = ({name, emojis, filter, onEmojiSelected, onHover}) => {
    filter = filter.toLowerCase();
    return (
        <div className={styles.emojiGroup}>
            <div className={styles.groupLabel}>{name}</div>
            <div>
                {Object.keys(emojis).map((value: string, index: number) => {
                    let emoji: Emoji = emojis[value];
                    return (
                        <button key={index} className={styles.emojiButton} onMouseEnter={() => {onHover(value, emoji)}} onClick={() => { onEmojiSelected(value) }}>
                            <img src={emoji.url} className={styles.emoji} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
};
export default EmojiGroup;