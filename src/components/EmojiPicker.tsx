import React, { useState } from 'react';
import styles from '../css/emoji-picker.module.css';

import { filterEmojiGroups, wrapEmoji } from '../helper';

import EmojiGroup from './EmojiGroup';

export interface Emoji {
    url: string,
    aliases ?: Array<string>
}

export interface SimpleEmojis {
    [name: string]: string //emoji name : url
}

export interface EmojisByName {
    [name: string]: Emoji;
}

export interface IEmojiGroup {
    [name: string]: EmojisByName
}

export interface EmojiPickerProps {
    emojiByGroup: IEmojiGroup,
    className?: string,
    onEmojiSelected: (emojiName: string) => void 
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({emojiByGroup, className, onEmojiSelected}) => {


    const [searchInput, updateSearchinput] = useState("");

    const [hoverData, updateHoverData] = useState< { hovered: boolean, data ?: { emojiName: string, emoji: Emoji } } >({
        hovered: true
    });

    const hoverEmoji = function(emojiName: string, emoji: Emoji) {
        updateHoverData({
            hovered: true,
            data: {
                emojiName: emojiName,
                emoji: emoji
            }
        });
    };

    const filteredEmojiGroups = filterEmojiGroups(emojiByGroup, searchInput);

    return (
        <div className={[styles.variables, styles.emojiContainer, className].join(' ')}>
            <div className={styles.content}>
                <div className={styles.innerContent}>

                    {/* Search bar */}
                    <div className={styles.emojiSearch}>
                        <div className={styles.inputContainer}>
                            <input className={styles.input} value={searchInput} onChange={(event) => {updateSearchinput(event.target.value)}} placeholder="Search emojis" />
                        </div>
                    </div>

                    {/* Emoji groups & emojis */}
                    <div className={styles.groupsWrapper}>
                        <div className={styles.groups}>
                            {
                            Object.keys(filteredEmojiGroups).map((name: string, index: number) => {
                                return <EmojiGroup key={index} name={name} filter={searchInput} onEmojiSelected={onEmojiSelected} onHover={hoverEmoji} emojis={filteredEmojiGroups[name]} />
                            })}
                        </div>
                    </div>

                    {/* Hover preview */}
                    <div className={styles.emojiPreview}>
                        { (hoverData.hovered && hoverData.data != undefined) ? (
                                <>
                                    <img src={hoverData.data.emoji.url} className={[styles.emoji, styles.tinyEmoji].join(' ')} />
                                    <span className={styles.previewText}>{wrapEmoji(hoverData.data.emojiName)}</span>
                                </>
                            ) : (
                                <span className={styles.noPreviewText}>Hover to preview</span>
                            )
                        }
                    </div>


                </div>
            </div>
        </div>
    )
};
export {EmojiPicker};
