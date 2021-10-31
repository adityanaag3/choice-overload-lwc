const wordsList = [
    {
        label: 'Slack',
        value: 'df',
        question: 'What does SLACK stand for?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            {
                id: '1',
                value: 'Secured Log of All Communication and Knowledge'
            },
            {
                id: '2',
                value: 'Strategic Log of All Communication and Knowledge'
            },
            {
                id: '3',
                value: 'Searchable Log of All Communication and Knowledge'
            },
            { id: '4', value: 'Safe Log of All Communication and Knowledge' }
        ],
        ans: ['3']
    },
    {
        label: 'Sample Gallery',
        value: 'df2',
        question:
            'Which of the following Sample Gallery App is created for Marketing Cloud use cases?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Redwoods Insurance' },
            { id: '2', value: 'Easy Spaces' },
            { id: '3', value: 'AMP Email Demos' },
            { id: '4', value: 'E-Cars' }
        ],
        ans: ['3']
    },
    {
        label: 'Dreamforce',
        value: 'df3',
        question: 'Guess the Luminary Speakers from Dreamforce 21?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Will Smith' },
            { id: '2', value: 'Barack Obama' },
            { id: '3', value: 'Jane Fonda' },
            { id: '4', value: 'Tim Cook' }
        ],
        ans: ['1', '3']
    },
    {
        label: 'Salesforce Mascots',
        value: 'df4',
        question: '_______ is the Newest Salesforce Character.',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Meta' },
            { id: '2', value: 'Brandy' },
            { id: '3', value: 'Ruth' },
            { id: '4', value: 'Blaze' }
        ],
        ans: ['2']
    },
    {
        label: "Winter '22 Release",
        value: 'df5',
        question:
            'Which of the following features is GA from Winter 22 release?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Flow Orchestrator' },
            { id: '2', value: 'LMS in Aura and LWR Site Pages' },
            { id: '3', value: 'Ability to call invocable actions from Apex' },
            { id: '4', value: 'Lightning Web Security' }
        ],
        ans: ['2']
    },
    {
        label: 'Community',
        value: 'df6',
        question:
            'Which of the following is your home base for sharing ideas with the Trailblazer Community and Salesforce product managers?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'AppExchange' },
            { id: '2', value: 'StackExchange' },
            { id: '3', value: 'StockExchange' },
            { id: '4', value: 'IdeaExchange' }
        ],
        ans: ['4']
    }
];

module.exports = wordsList;
