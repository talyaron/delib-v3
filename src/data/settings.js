var settings = {
    roles: {
        groups: {
            read: {
                owner: true,
                member: true,
                editor: true,
                nonMember: true,
                anonymous: true
            },
            write: {
                owner: true,
                editor: true
            }
        },
        questions: {
            read: {
                owner: true,
                member: true,
                editor: true,
                nonMember: true,
                anonymous: true
            },
            write: {
                owner: true,
                editor: true
            }
        },
        subQuestions: {
            read: {
                owner: true,
                member: true,
                editor: true,
                nonMember: true,
                anonymous: true
            },
            write: {
                owner: true,
                editor: true
            }
        }
    }
}

export default settings; 