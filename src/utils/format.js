export default function format(param) {

    const input = param;
    console.log(input);

    var output = '';

    if (input.type === 'tavern') {
        output = 
        `# ${input.tavernName}\n` +
        `##### Comfort Level:\n${input.tavernComfort}\n`; 
    } else if (input.type === 'npc') {
        output =
        `## ${input.firstName} ${input.lastName}\n` +
        `##### Personality:\n${input.personality}\n` +
        `##### Race:\n${input.race}\n` +
        `##### Hair Color:\n${input.hairColor}\n` +
        `##### Eye Color:\n${input.eyeColor}\n`;
    }
    return output;
}