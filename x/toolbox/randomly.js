function hatPuller(initial) {
    let current = [...initial];
    return () => {
        if (current.length === 0)
            current = [...initial];
        const randomIndex = Math.floor(Math.random() * current.length);
        const selected = current[randomIndex];
        current.splice(randomIndex, 1);
        return selected;
    };
}
const library = {
    people: hatPuller(["joe biden", "donald trump", "hillary clinton", "steven seagal", "the queen", "ronald reagan", "ronald mcdonald", "alex jones", "mr rogers", "nicki minaj"]),
    nouns: hatPuller(["turtle", "wombat", "spoon", "coffee bean", "man", "woman", "mushroom", "body of water", "sandal", "sea creature", "bottom dweller", "pasta", "disease", "salvation"]),
    adjectives: hatPuller(["fuzzy", "naked", "warm", "greasy", "cold", "unhinged", "disturbed", "menacing", "welcoming", "glorious", "seething", "hairy", "smelly", "curious", "shameless", "shameful", "colorful"]),
    verbs: hatPuller(["destroyed", "accepted", "embraced", "walked", "jumped", "earned", "imagined", "programmed", "ruined", "uplifted", "promoted", "demoted", "attacked", "smothered"]),
    hows: hatPuller(["promptly", "quietly", "peacefully", "carefully", "cheerfully", "digustingly", "unimaginatively", "disgracefully", "elegantly", "carelessly"]),
};
const word = {
    get person() { return library.people(); },
    get noun() { return library.nouns(); },
    get adjective() { return library.adjectives(); },
    get verb() { return library.verbs(); },
    get how() { return library.hows(); },
};
const constructions = {
    nickname: hatPuller([
        () => `${word.adjective} ${word.person}`,
    ]),
    comment: hatPuller([
        () => `i encountered a ${word.noun}, which had a ${word.adjective} appearance. i ${word.how} ${word.verb} this.`,
        () => `my ${word.noun} is literally a ${word.adjective} ${word.noun} who ${word.verb} the ${word.noun} and ${word.how} ${word.verb} my last ${word.noun}.`,
        () => `it seems ${word.person} ${word.how} ${word.verb} my ${word.noun}!`,
        () => `with some luck, the ${word.adjective} ${word.noun} won't have ${word.how} ${word.verb} ${word.person}..`,
        () => `sadly, ${word.person} ${word.verb} the ${word.noun}. it was a ${word.adjective} affair.`,
    ]),
    subject: hatPuller([
        () => `${word.person} ${word.how} ${word.verb} the ${word.noun}`,
        () => `${word.adjective} ${word.person} ${word.how} ${word.verb} a ${word.noun}`,
        () => `${word.adjective}? a ${word.adjective} ${word.noun} ${word.verb} ${word.person}!`,
        () => `${word.person} ${word.how} ${word.verb} ${word.person}`,
    ])
};
export function randomNickname() {
    return constructions.nickname()();
}
export function randomComment() {
    return constructions.comment()();
}
export function randomSubject() {
    return constructions.subject()();
}
const randomUnsplashId = hatPuller([
    "1627087820883-7a102b79179a",
    "1555888997-03e986fc157b",
    "1608649672403-3609a75eae18",
    "1562457753-6867bda028cd",
    "1506794778202-cad84cf45f1d",
    "1531746020798-e6953c6e8e04",
    "1438761681033-6461ffad8d80",
    "1507003211169-0a1dd7228f2d",
    "1504257432389-52343af06ae3",
    "1500648767791-00dcc994a43e",
    "1529626455594-4ff0802cfb7e",
    "1528892952291-009c663ce843",
    "1614204424926-196a80bf0be8",
    "1509460913899-515f1df34fea",
]);
export function randomAvatar() {
    const id = randomUnsplashId();
    return `https://images.unsplash.com/photo-${id}?q=75&fm=jpg&w=200&h=200&fit=facearea`;
}
//# sourceMappingURL=randomly.js.map