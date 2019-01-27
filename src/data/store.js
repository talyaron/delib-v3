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
    questions: {}
}

module.exports = store; 