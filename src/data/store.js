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
    optionsVotes: {} //vote on options by user
}

module.exports = store; 