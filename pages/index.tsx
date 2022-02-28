import type { NextPage } from 'next'
import { useState } from 'react';
import { EmojiPicker, simplifyEmojis, emojify, IEmojiGroup, wrapEmoji } from '../src/index'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
	let emojiGroups: IEmojiGroup = {
		"Blob Emojis": {
			"BlobAngel": 			{ url: "https://cdn.discordapp.com/emojis/396521732086693888.png", "aliases": [] },
			"BlobAngry": 			{ url: "https://cdn.discordapp.com/emojis/580592809220898835.png", "aliases": [] },
			"BlobBanHammer": 		{ url: "https://cdn.discordapp.com/emojis/538636735672877066.png", "aliases": [] },
			"BlobBlush": 			{ url: "https://cdn.discordapp.com/emojis/396521772691881987.png", "aliases": [] },
			"BlobBongo": 			{ url: "https://cdn.discordapp.com/emojis/580593576929656833.gif", "aliases": [] },
		},
		"Pepe Emojis": {
			"MonkaChrist": 			{ url: "https://cdn.discordapp.com/emojis/662400519788298260.png", "aliases": [] },
			"MonkaGun": 			{ url: "https://cdn.discordapp.com/emojis/662400533641822221.png", "aliases": [] },
			"PepeCool": 			{ url: "https://cdn.discordapp.com/emojis/672161497526304795.png", "aliases": [] },
			"PepeDead": 			{ url: "https://cdn.discordapp.com/emojis/662400649639755797.png", "aliases": [] },
			"PepeMoneyRain": 		{ url: "https://cdn.discordapp.com/emojis/747196731480866907.gif", "aliases": [] },
			"PepeSadDance":			{ url: "https://cdn.discordapp.com/emojis/849698896031776768.gif", "aliases": [] },
			"PoggersSpin":			{ url: "https://cdn.discordapp.com/emojis/713636021606023221.gif", "aliases": [] },
			"PoggersCog":			{ url: "https://cdn.discordapp.com/emojis/498482209494401054.gif", "aliases": [] },
			"PoggersDance":			{ url: "https://cdn.discordapp.com/emojis/622494010703085598.gif", "aliases": [] },
			"PoggersHype":			{ url: "https://cdn.discordapp.com/emojis/505711851670339595.gif", "aliases": [] },
		},
		"Community": {
			"rbxflip":				{ url: "https://cdn.discordapp.com/emojis/827981485494632448.png", "aliases": ["flip"] },
			"str4t":				{ url: "https://cdn.discordapp.com/emojis/838293430803103804.png", "aliases": [] }
		}
	}; //Test data
	const simplifiedEmojis = simplifyEmojis(emojiGroups); //also test data
	console.log(emojify(simplifiedEmojis, "Hello this is a test :rbxflip: aa :monkachrist: LOOOL ... :flip: works too!")); //test function


	//To implement:
	const [displayEmojiPicker, updateDisplayEmojiPicker] = useState(true);
	const [msgInput, updateMsgInput] = useState("");
	const onEmojiSelected = function(name: string) {
		updateDisplayEmojiPicker(false); // can be removed
		updateMsgInput(`${msgInput}${wrapEmoji(name)} `);
	}

	return (
		<div className={styles.chatContainer}>
			<div className={styles.innerContainer}>
				<div className={styles.inputContainer}>
					<input className={styles.input} placeholder="Send a message" value={msgInput} onChange={(event) => {updateMsgInput(event.target.value)}} />
					<div className={styles.actions}>
						<button className={[styles.button, styles.iconOnly, styles.transparent].join(' ')} type="button" onClick={() => { updateDisplayEmojiPicker(!displayEmojiPicker) }}>
							<svg className={styles.icon} viewBox="0 0 496 512">
								<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm90.2-146.2C315.8 352.6 282.9 368 248 368s-67.8-15.4-90.2-42.2c-5.7-6.8-15.8-7.7-22.5-2-6.8 5.7-7.7 15.7-2 22.5C161.7 380.4 203.6 400 248 400s86.3-19.6 114.8-53.8c5.7-6.8 4.8-16.9-2-22.5-6.8-5.6-16.9-4.7-22.6 2.1zM168 240c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z">
								</path>
							</svg>
						</button>
					</div>
				</div>
				{displayEmojiPicker && <EmojiPicker emojiByGroup={emojiGroups} onEmojiSelected={onEmojiSelected} />}
			</div>
		</div>
	)
}

export default Home
