export default function format(param) {

    const input = param;
    console.log(input);

    var output = '';

    if (input.type === 'tavern') {
        output = 
        `# (Tavern) ${input.tavernName}\n` +
        `- **Comfort Level**: ${input.tavernComfort}\n`; 
    } else if (input.type === 'npc') {
        if (input.parent === 'null') {
            output = '#'
        } else {
            output = '##'
        }
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