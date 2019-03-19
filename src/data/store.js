var store = {
    user: {},
    userGroups: [],
    current: {
        org: {
            title: 'שם הארגון'
        },
        team: {
            title: 'שם הקבוצה'
        }
    },
    orgs: [],
    teams: [],
    lastPage: "",
    questions: {}, //list of questions in groupPage
    groups: {}, //groups name
    options: [],//options in a given question
    optionsVotes: {},
    optionsLoc: {},
    optionsDetails: {}, //vote on options by user
    messagesShow: {}, // history of messages to show
    feedsSubscribe: {}, // used for feed unsubscribes
    feed: {}, //the feed
    showFeed: false,
    numberOfNewMessages: 0
}

module.exports = store; 