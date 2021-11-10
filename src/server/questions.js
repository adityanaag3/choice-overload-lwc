const wordsList = [
    {
        label: 'Tableau Dashboard',
        value: 'anz',
        question:
            'Embedding Tableau dashboard in Salesforce can be carried out by lightning Web component. Where can I download it from?',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            {
                id: '1',
                value: 'Write code in sparkler/Apex'
            },
            {
                id: '2',
                value: 'Download from tableau.com (http://tableau.com/)'
            },
            {
                id: '3',
                value: 'Salesforce App exchange'
            },
            { id: '4', value: 'Use Extensions' }
        ],
        ans: ['3']
    },
    {
        label: 'Scratch Org',
        value: 'anz2',
        question:
            'Identify the options that can be specified in scratch org definition file',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'edition' },
            { id: '2', value: 'devhubOrgName' },
            { id: '3', value: 'hasSamleData' },
            { id: '4', value: 'settings' },
            { id: '5', value: 'noSampleData' }
        ],
        ans: ['1', '3', '4']
    },
    {
        label: 'Tableau API',
        value: 'anz3',
        question:
            "What API is used to create/update Tableau's proprietary data storage format?",
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'REST API' },
            { id: '2', value: 'Analytics API' },
            { id: '3', value: 'Document API' },
            { id: '4', value: 'Hyper API' }
        ],
        ans: ['4']
    },
    {
        label: 'Salesforce CLI',
        value: 'anz4',
        question: 'Identify valid sfdx force commands',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'force:apex' },
            { id: '2', value: 'force:package1' },
            { id: '3', value: 'force:update' },
            { id: '4', value: 'force:community' },
            { id: '5', value: 'force:set' }
        ],
        ans: ['1', '2', '5']
    },
    {
        label: 'Salesforce Extensions',
        value: 'anz5',
        question:
            'Which of the following extensions are part of Salesforce Extension Pack',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'Apex Interactive Debugger' },
            { id: '2', value: 'HTML Snippets' },
            { id: '3', value: 'Salesforce CLI Integration' },
            { id: '4', value: 'Git History' },
            { id: '5', value: 'Apex Replay Debugger' }
        ],
        ans: ['1', '3', '5']
    }
];

module.exports = wordsList;
