export default function format(param) {

    const input = param;
    console.log(input);

    var output = '';

    for (var i = 0; i < input.parent.split("_").length; i++) {
        output += '#';
    }

    if (input.type === 'tavern') {
        output += 
        ` (Tavern) ${input.tavernName}\n` +
        `- **Comfort Level**: ${input.tavernComfort}\n` +
        `- **Event**: ${input.event}\n` +
        `- **Entertainment**: ${input.entertainment}\n` +
        `- **Patron**: ${input.patron}\n` +
        `- **Cocktail**: ${input.cocktail}\n` +
        `- **Trouble**: ${input.trouble}\n` +
        `- **Notable**: ${input.notable}\n`; 
    } else if (input.type === 'shop') {
        output += 
        ` (Shop) ${input.product}\n` +
        `- **Shop Type**: ${input.shopType}\n` +
        `- **Size**: ${input.size}\n` +
        `- **Owner**: ${input.owner}\n` +
        `- **Shop Condition**: ${input.shopCondition}\n` +
        `- **Merch Condition**: ${input.merchCondition}\n` +
        `- **Supplier**: ${input.supplier}\n` +
        `- **Priced**: ${input.priced}\n` +
        `- **How Busy?**: ${input.busyOrNa}\n` +
        `- **Point of Interest**: ${input.interest}\n`;

    } else if (input.type === 'npc') {
        output +=
        ` (NPC) ${input.firstName} ${input.lastName}\n` +
        `- **Personality**: ${input.personality}\n` +
        `- **Race**: ${input.race}\n` +
        `- **Hair**: ${input.hairColor} ${input.hairType}\n` +
        `- **Eyes**: ${input.eyeColor} ${input.eyeType}\n` +
        `- **Ears**: ${input.earType}\n` +
        `- **Mouth**: ${input.mouthType}\n` +
        `- **Nose**: ${input.noseType}\n` +
        `- **Jaw**: ${input.jawType}\n` +
        `- **Body**: ${input.height} ${input.bodyType}\n`;
    }
    return output;
}