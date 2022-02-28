import React, { useState } from 'react';
import styles from '../css/emoji-picker.module.css';
import EmojiGroup from './EmojiGroup';
export var emojiDelimeter = ':'; //config
export var wrapEmoji = function (emojiName) {
    return emojiDelimeter + emojiName + emojiDelimeter;
};
export var simplifyEmojis = function (emojiByGroup) {
    var simplified = {};
    Object.keys(emojiByGroup).map(function (groupName) {
        Object.keys(emojiByGroup[groupName]).forEach(function (emojiName) {
            simplified[emojiName.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            for (var _i = 0, _a = emojiByGroup[groupName][emojiName].aliases; _i < _a.length; _i++) {
                var alias = _a[_i];
                simplified[alias.toLowerCase()] = emojiByGroup[groupName][emojiName].url;
            }
        });
    });
    return simplified;
};
export var emojify = function (emojis, message) {
    var matches = message.match(/(:\w*?:)/g);
    if (!matches)
        return message;
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var emoji = matches_1[_i];
        message = message.replace(emoji, "<image src='".concat(emojis[emoji.replaceAll(emojiDelimeter, '').toLowerCase()], "'/>"));
    }
    return message;
};
export var filterEmojiGroups = function (emojiByGroup, filter) {
    if (filter == '')
        return emojiByGroup;
    var emojiByGroupCopy = {};
    //Forced to do it this way to delete the entire group when it doesnt have a single emoji that qualifies
    //Also forced to create a copy of the dictionary so when i am deleting the dictionary is not affected because of reference
    //Potential to recode this to save space complexity by creating an optional property for each emoji and emojigroup called hidden
    Object.keys(emojiByGroup).map(function (groupName) {
        var filterPass = false;
        if (groupName.toLowerCase().indexOf(filter) != -1) {
            filterPass = true;
            emojiByGroupCopy[groupName] = emojiByGroup[groupName];
        }
        else {
            emojiByGroupCopy[groupName] = {};
            Object.keys(emojiByGroup[groupName]).forEach(function (emojiName) {
                filterPass = (emojiName + emojiByGroup[groupName][emojiName].aliases.join(' ')).toLowerCase().indexOf(filter) != -1;
                if (filterPass)
                    emojiByGroupCopy[groupName][emojiName] = emojiByGroup[groupName][emojiName];
            });
            if (Object.keys(emojiByGroupCopy[groupName]).length == 0)
                delete emojiByGroupCopy[groupName];
        }
    });
    return emojiByGroupCopy;
};
var EmojiPicker = function (_a) {
    var emojiByGroup = _a.emojiByGroup, className = _a.className, onEmojiSelected = _a.onEmojiSelected;
    var _b = useState(""), searchInput = _b[0], updateSearchinput = _b[1];
    var _c = useState({
        hovered: true
    }), hoverData = _c[0], updateHoverData = _c[1];
    var hoverEmoji = function (emojiName, emoji) {
        updateHoverData({
            hovered: true,
            data: {
                emojiName: emojiName,
                emoji: emoji
            }
        });
    };
    var filteredEmojiGroups = filterEmojiGroups(emojiByGroup, searchInput);
    return (React.createElement("div", { className: [styles.variables, className, styles.emojiContainer].join(' ') },
        React.createElement("div", { className: styles.content },
            React.createElement("div", { className: styles.innerContent },
                React.createElement("div", { className: styles.emojiSearch },
                    React.createElement("div", { className: styles.inputContainer },
                        React.createElement("input", { className: styles.input, value: searchInput, onChange: function (event) { updateSearchinput(event.target.value); }, placeholder: "Search emojis" }))),
                React.createElement("div", { className: styles.groupsWrapper },
                    React.createElement("div", { className: styles.groups }, Object.keys(filteredEmojiGroups).map(function (name, index) {
                        return React.createElement(EmojiGroup, { key: index, name: name, filter: searchInput, onEmojiSelected: onEmojiSelected, onHover: hoverEmoji, emojis: filteredEmojiGroups[name] });
                    }))),
                React.createElement("div", { className: styles.emojiPreview }, (hoverData.hovered && hoverData.data != undefined) ? (React.createElement(React.Fragment, null,
                    React.createElement("img", { src: hoverData.data.emoji.url, className: [styles.emoji, styles.tinyEmoji].join(' ') }),
                    React.createElement("span", { className: styles.previewText }, wrapEmoji(hoverData.data.emojiName)))) : (React.createElement("span", { className: styles.noPreviewText }, "Hover to preview")))))));
};
export { EmojiPicker };
//# sourceMappingURL=EmojiPicker.js.map