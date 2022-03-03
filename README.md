# @jadbalout/react-emoji-picker

Modern Emoji Picker Component in React

## Installation

```bash
npm install --save @jadbalout/react-emoji-picker
```

## Usage

```jsx
import React, { useState } from "react";
import { EmojiPicker, emojify, wrapEmoji, simplifyEmojis } from "@jadbalout/react-emoji-picker";

const emojiGroups = {
    "Group Name": {
        "Emoji1": { url: "https://cdn.discordapp.com/emojis/396521732086693888.png", "aliases": [] },
    }
}

const simplifiedEmojis = simplifyEmojis(emojiGroups); //to speed up unwrapping

const App = () => {

    const [output, updateOutput] = useState("");
    const onEmojiSelected = function(name: string) {
		updateOutput(`${output}${wrapEmoji(name)} `);
	}
    return (
		<>
			<p>Output: { output }</p>
            <p>Unwrapped Output: { emojify(simplifiedEmojis, output) }</p>
        	<EmojiPicker emojiByGroup={emojiGroups} onEmojiSelected={onEmojiSelected} />
		</>
    )

}
```

## Documentation

### Accepted Props

| Name              | Type          | Default Value | Required? | Description                                                                          |
|-------------------|---------------|---------------|-----------|--------------------------------------------------------------------------------------|
| `emojiByGroup`    | `IEmojiGroup` | `undefined`   | Yes       | Object containing data about groups and their emojis to be displayed.                |
| `onEmojiSelected` | `Function`    | `undefined`   | Yes       | Callback to run when clicking an emoji.                                              |
| `className`       | `String`      | `null`        | No        | Custom class to replace CSS variables or override emojiContainer class declarations. |

#### emojiByGroup

`emojiByGroup` example structure:

```js
const emojiGroups = {
    "Group Name": {
        "Emoji1": { url: "https://cdn.discordapp.com/emojis/396521732086693888.png", "aliases": ['alias1'] },
        //more objects with emoji name as key
    },
    //... more objects with group name as key
}
```

`aliases` is not mandatory property but will be taken into consideration during search functionality and emoji unwrapping.

#### onEmojiSelected

`onEmojiSelected` is the function called when an emoji is clicked. It must take an argument of type `string` which is the name of the emoji clicked.

#### className

`className` is used to replace default CSS variables used or to override emojiContainer class declarations.

The following CSS variables exist:

| Name                                       | Default Value                     |
| ------------------------------------------ | --------------------------------- |
| `--emoji-picker-bg-color`                  | `hsl(220, 22%, 12%)`              |
| `--emoji-picker-label-color`               | `hsl(220, 22%, 70%)`              |
| `--emoji-picker-emoji-hover-color`         | `hsla(220, 100%, 82%, 0.13);`     |
| `--emoji-picker-input-bg-color`            | `hsl(220, 22%, 16%)`              |
| `--emoji-picker-input-bg-hover-color`      | `hsl(220, 22%, 37%)`              |
| `--emoji-picker-border`                    | `1px solid hsl(220, 22%, 25%);`   |

### Helper functions

Helper functions are used to wrap and unwrap emojis.

#### simplifyEmojis

`simplifyEmojis` takes your `emojiByGroup` variable as a parameter and simplifies it into a simple emoji object mapped only by emoji name to be used by the unwrapper. It is better to use it once only at the start of your code to avoid iterating over the entire object everytime unwrapping is needed.

#### wrapEmoji

`wrapEmoji` is used to wrap your emoji between delimeters and it takes two parameters. The first parameter is the emoji name which is required. The second parameter which is not required is the delimeter. The default value for the delimeter is `:`. `wrapEmoji` returns the altered wrapped emoji name.

#### emojify

`emojify` is used to unwrap the wrapped message and it takes three possible parameter. The first parameter is required and is a simplified emojis object obtained by using `simplifyEmojis`. The second parameter is the string to unwrap. The last parameter is not required and it is the delimeter used to wrap the emoji. The default value for the delimeter is `:`. `emojify` returns the unwrapped message (type: `string`).
