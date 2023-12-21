export default function format(param) {

    const input = param;
    console.log(input);

    var output = '';

    for (var i = 0; i < input.parent.split("_").length; i++) {
        output += '#';
    }

    if (input.type === 'world') {
        output += 
        ` (World) ${input.name}\n` +
        `- **Size**: ${input.size}\n` +
        `- **Climate**: ${input.climate}\n` +
        `- **Land Masses**: ${input.landMasses}\n` +
        `- **Magic**: ${input.magic}\n` +
        `- **Technology**: ${input.technology}\n` +
        `- **Unique**: ${input.unique}\n` +
        `- **Dominated**: ${input.dominated}\n` +
        `- **Natural Races**: ${input.natRaces}\n` +
        `- **Cataclysm**: ${input.cataclysm}\n` +
        `- **Creation**: ${input.creation}\n`;
    }
    else if (input.type === 'continent') {
        output += 
        ` (Continent) ${input.name}\n` +
        `- **Size**: ${input.size}\n` +
        `- **Location**: ${input.location}\n` +
        `- **Climates**: ${input.climates}\n` +
        `- **Unique**: ${input.unique}\n` +
        `- **Discovery**: ${input.discovery}\n` +
        `- **Discoverer**: ${input.discoverer}\n` +
        `- **Domestic Creatures**: ${input.dCreatures}\n` +
        `- **Imported Creatures**: ${input.iCreatures}\n` +
        `- **Domestic Plants**: ${input.dPlants}\n` +
        `- **Imported Plants**: ${input.iPlants}\n`;
    }
    else if (input.type === 'nation') {
        output += 
        ` (Nation) ${input.name}\n` +
        `- **Age**: ${input.age}\n` +
        `- **Politics**: ${input.politics}\n` +
        `- **Economics**: ${input.economics}\n` +
        `- **Ruler**: ${input.ruler}\n` +
        `- **Founder**: ${input.founder}\n` +
        `- **Unique Characteristic**: ${input.unique}\n` +
        `- **Divisions**: ${input.divisions}\n` +
        `- **Citizen Mood**: ${input.citizenMood}\n` +
        `- **Citizen Wealth**: ${input.citizenWealth}\n` +
        `- **Religion**: ${input.religion}\n` +
        `- **Notable Law**: ${input.notableLaw}\n` +
        `- **Language**: ${input.language}\n` +
        `- **Class System**: ${input.classSystem}\n` +
        `- **Outcasts**: ${input.outcasts}\n`;
    }
    else if (input.type === 'settlement') {
        output += 
        ` (Settlement) ${input.name}\n` +
        `- **Population**: ${input.population}\n` +
        `- **Inhabitants**: ${input.inhabitants}\n` +
        `- **Atmosphere**: ${input.atmosphere}\n` +
        `- **Prominent Feature**: ${input.promFeature}\n` +
        `- **Possible Reason To Stay**: ${input.plotHook}\n`;
    }
    else if (input.type === 'shop') {
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
    } else if (input.type === 'tavern') {
        output += 
        ` (Tavern) ${input.tavernName}\n` +
        `- **Comfort Level**: ${input.tavernComfort}\n` +
        `- **Event**: ${input.event}\n` +
        `- **Entertainment**: ${input.entertainment}\n` +
        `- **Patron**: ${input.patron}\n` +
        `- **Cocktail**: ${input.cocktail}\n` +
        `- **Trouble**: ${input.trouble}\n` +
        `- **Notable**: ${input.notable}\n`; 
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
    } else if (input.type === 'item') {
        if (input.subtype === 'potion') {
            output +=
            ` (Potion) ${input.title} of ${input.effect.split('.')[0]}\n` +
            ` - **Effect**: ${input.effect}\n` +
            ` - **Strength**: ${input.strength}\n` +
            ` - **Side Effect**: ${input.sideEffect}\n` +
            ` - **container**: ${input.container}\n` +
            ` - **Appearance1**: ${input.appearance1}\n` +
            ` - **Appearance2**: ${input.appearance2}\n` +
            ` - **Texture:**: ${input.texture}\n` +
            ` - **Smell**: ${input.smell}\n` +
            ` - **Taste**: ${input.taste}\n` +
            ` - **Label**: ${input.label}\n`
        }
    }
    if (input.notes !== '') {
    output += `- **Notes**: ${input.notes}\n`;
    }
    return output;
}