const wordsList = [
    {
        label: 'DevTalkies',
        value: 'df',
        question: 'Identify guests from #DevTalkies episode 8',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            {
                id: '1',
                value: 'Megan Petersen'
            },
            {
                id: '2',
                value: 'Abhishek Simgekar'
            },
            {
                id: '3',
                value: 'Divya Ashok'
            },
            { id: '4', value: 'Sudha Sundaram' }
        ],
        ans: ['1', '4']
    },
    {
        label: 'Certification',
        value: 'df2',
        question:
            'Choose all the specialization certifications needed to earn the Salesforce Application Architect credential',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Platform Developer I' },
            { id: '2', value: 'Platform App Builder' },
            { id: '3', value: 'Sharing & visibility Designer' },
            { id: '4', value: 'Data Architecture & Management Designer' },
            { id: '5', value: 'Integration Architecture Designer' }
        ],
        ans: ['1', '2', '3', '4']
    },
    {
        label: 'Dreamforce',
        value: 'df3',
        question: 'Identify all the Luminary Speakers from Dreamforce 21',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Will Smith' },
            { id: '2', value: 'Blake Leeper' },
            { id: '3', value: 'Jane Fonda' },
            { id: '4', value: 'Tim Cook' }
        ],
        ans: ['1', '2', '3']
    },
    {
        label: 'Salesforce',
        value: 'df4',
        question: 'Which of the following properties are owned by Salesforce?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'AppExchange' },
            { id: '2', value: 'StackExchange' },
            { id: '3', value: 'StockExchange' },
            { id: '4', value: 'IdeaExchange' }
        ],
        ans: ['1', '4']
    },
    {
        label: 'Salesforce Mascots',
        value: 'df5',
        question: 'Identify the Salesforce Trailhead Characters from the group',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Brandy' },
            { id: '2', value: 'Hootie' },
            { id: '3', value: 'Earnie' },
            { id: '4', value: 'Cloudy' }
        ],
        ans: ['1', '2', '3', '4']
    },
    {
        label: "Winter '22",
        value: 'df6',
        question:
            'Which of the following features is GA since the Winter ‘22 release?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'LMS in LWR Site Pages' },
            { id: '2', value: 'LMS in Aura' },
            { id: '3', value: 'Ability to call invocable actions from Apex' },
            { id: '4', value: 'Lightning Web Security' }
        ],
        ans: ['4']
    }
];

module.exports = wordsList;
