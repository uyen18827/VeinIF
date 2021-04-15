export class Quest {
}
export let questRepo = [
    {
        name: 'Fetch Coins',
        code: 'coins01',
        description: `A man has asked you to find his coin purse.
        He suspected that a young kid had made off with it.
        His coin purse has a purple tulips embroidered on by his late wife.`,
        stages: [
            //array starts with 0
            {
                id: 0,
                content: `You agree to help the man find his coins.`
            },
            {
                id: 1,
                content: `You saw a farmer boy carrying a coin purse with
                purple tulips embroidery. The rest of his clothes are tattered, but the coin purse looks well kept.`
            },
            {
                id: 3,
                content: `You managed to intimidate the boy into 
                giving you the coin purse.`
            },
            {
                id: 4,
                content: `You wait for the boy to sleep and stole the coin purse.`
            },
            {
                id: 5,
                content: `You gave the coin purse back to the man who lost it.<br> Quest Completed`
            },
            {
                id: 6,
                content: `The boy ran as you try to steal the coin purse, and tripped. The coin purse fell into the water. You couldn't get the purse from the boy.<br> Quest Failed.`
            },
        ]
    },
];
export let playerQuestLog = [];
export function updateQuestLog(questCode, stageID) {
    let found = questRepo.find(quest => quest.code == questCode);
    let currentStage = found.stages[stageID];
    let userLog = playerQuestLog.find(quest => quest.code == questCode);
    if (userLog) {
        userLog.stages.push(currentStage);
    }
    else {
        //if not found the quest, push new quest object
        let newQuest = {
            name: found.name,
            code: questCode,
            description: found.description,
            stages: [currentStage],
        };
        playerQuestLog.push(newQuest);
    }
}
