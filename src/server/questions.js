const wordsList = [
    {
        label: 'Dreamforce',
        value: 'df',
        question: 'Match the celebrity speaker to the Dreamforce year',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: '1', value: 'one' },
            { id: '2', value: 'two' },
            { id: '3', value: 'three' },
            { id: '4', value: 'four' },
            { id: '5', value: 'five' }
        ],
        ans: ['1']
    },
    {
        label: 'another dreamforce',
        value: 'df2',
        question: 'Some random question',
        iconurl:
            '/resources/icons/utility-sprite/svg/symbols.svg#swarm_request',
        options: [
            { id: 'a1', value: 'one' },
            { id: 'a2', value: 'two' },
            { id: 'a3', value: 'three' },
            { id: 'a4', value: 'four' }
        ],
        ans: ['1', '2']
    }
];

module.exports = wordsList;
