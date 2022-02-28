import React from 'react';
import styles from '../css/emoji-picker.module.css';
var EmojiGroup = function (_a) {
    var name = _a.name, emojis = _a.emojis, filter = _a.filter, onEmojiSelected = _a.onEmojiSelected, onHover = _a.onHover;
    filter = filter.toLowerCase();
    return (React.createElement("div", { className: styles.emojiGroup },
        React.createElement("div", { className: styles.groupLabel }, name),
        React.createElement("div", null, Object.keys(emojis).map(function (value, index) {
            var emoji = emojis[value];
            return (React.createElement("button", { key: index, className: styles.emojiButton, onMouseEnter: function () { onHover(value, emoji); }, onClick: function () { onEmojiSelected(value); } },
                React.createElement("img", { src: emoji.url, className: styles.emoji })));
        }))));
};
export default EmojiGroup;
//# sourceMappingURL=EmojiGroup.js.map