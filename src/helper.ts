
import {SimpleEmojis, IEmojiGroup} from './components/EmojiPicker';

export const emojiDelimeter = ':';

export const emojify = (emojis: SimpleEmojis, message: string, delimeter: string = emojiDelimeter) => {
    const matches = message.match(/(:\w*?:)/g);
    if(!matches) return message;
    for (let emoji of matches) {
        message = message.replace(emoji, `<img src='${emojis[emoji.replaceAll(delimeter, '').toLowerCase()]}'/>`);
    }
    return message;
}

export const wrapEmoji = (emojiName: string, delimeter: string = emojiDelimeter) => {
    return emojiDelimeter + emojiName + delimeter;
}



export const simplifyEmojis = (emojiByGroup: IEmojiGroup) => {
    let simplified: SimpleEmojis = {};
    Object.keys(emojiByGroup).map((groupName:string) => {
        Object.keys(emojiByGroup[groupName]).forEach((emojiName: string) => {
            simplified[emojiName.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            for(const alias of (emojiByGroup[groupName][emojiName].aliases || [])) {
                simplified[alias.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            }
        });
    });
    return simplified;
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
                filterPass = (emojiName + (emojiByGroup[groupName][emojiName].aliases || []).join(' ')).toLowerCase().indexOf(filter) != -1;
                if(filterPass)
                    emojiByGroupCopy[groupName][emojiName] = emojiByGroup[groupName][emojiName];
            });
            if(Object.keys(emojiByGroupCopy[groupName]).length == 0) delete emojiByGroupCopy[groupName];
        }
    });
    return emojiByGroupCopy;
};