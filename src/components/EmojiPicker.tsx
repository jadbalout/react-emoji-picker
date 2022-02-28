import React, { useState } from 'react';
import styles from '../css/emoji-picker.module.css';
import EmojiGroup from './EmojiGroup';
export const emojiDelimeter = ':'; //config

export interface Emoji {
    url: string,
    aliases: Array<string>
}

export interface SimpleEmojis {
    [name: string]: string //emoji name : url
}

export interface EmojisByName {
    [name: string]: Emoji;
}

export type IEmojiGroup = {
    [name: string]: EmojisByName
}

export interface EmojiPickerProps {
    emojiByGroup: IEmojiGroup,
    className?: string,
    onEmojiSelected: (emojiName: string) => void 
}

export const wrapEmoji = (emojiName: string) => { //To be exported
    return emojiDelimeter + emojiName + emojiDelimeter;
}


export const simplifyEmojis = (emojiByGroup: IEmojiGroup) => {
    let simplified: SimpleEmojis = {};
    Object.keys(emojiByGroup).map((groupName:string) => {
        Object.keys(emojiByGroup[groupName]).forEach((emojiName: string) => {
            simplified[emojiName.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            for(const alias of emojiByGroup[groupName][emojiName].aliases) {
                simplified[alias.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            }
        });
    });
    return simplified;
}

export const emojify = (emojis: SimpleEmojis, message: string) => {
    const matches = message.match(/(:\w*?:)/g);
    if(!matches) return message;
    for (let emoji of matches) {
        message = message.replace(emoji, `<image src='${emojis[emoji.replaceAll(emojiDelimeter, '').toLowerCase()]}'/>`);
    }
    return message;
}

export const filterEmojiGroups = (emojiByGroup: IEmojiGroup, filter: string) => {

    if(filter == '') return emojiByGroup;

    let emojiByGroupCopy: IEmojiGroup = {};

    //Forced to do it this way to delete the entire group when it doesnt have a single emoji that qualifies
    //Also forced to create a copy of the dictionary so when i am deleting the dictionary is not affected because of reference
    //Potential to recode this to save space complexity by creating an optional property for each emoji and emojigroup called hidden

    Object.keys(emojiByGroup).map((groupName:string) => {
        let filterPass = false;
        if (groupName.toLowerCase().indexOf(filter) != -1) {
            filterPass = true;
            emojiByGroupCopy[groupName] = emojiByGroup[groupName];
        } else {
            emojiByGroupCopy[groupName] = {};
            Object.keys(emojiByGroup[groupName]).forEach((emojiName: string) => {
                filterPass = (emojiName + emojiByGroup[groupName][emojiName].aliases.join(' ')).toLowerCase().indexOf(filter) != -1;
                if(filterPass)
                    emojiByGroupCopy[groupName][emojiName] = emojiByGroup[groupName][emojiName];
            });
            if(Object.keys(emojiByGroupCopy[groupName]).length == 0) delete emojiByGroupCopy[groupName];
        }
    });
    return emojiByGroupCopy;
};

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
        <div className={[styles.variables, className, styles.emojiContainer].join(' ')}>
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
