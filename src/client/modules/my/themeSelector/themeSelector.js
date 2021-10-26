/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { LightningElement, api } from 'lwc';

export default class ThemeSelector extends LightningElement {
    d3Initialized = false;
    d3instance;

    data;

    @api isHost;

    disconnectedCallback() {}

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.initializeD3();
    }

    async initializeD3() {
        fetch('/api/getquestions')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    this.data = data;
                    this.initD3(
                        this.template.querySelector('svg.d3'),
                        data,
                        this
                    );
                }
            });
    }

    initD3(element, data, lwcThis) {
        var padding = { top: 20, right: 40, bottom: 0, left: 0 },
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top - padding.bottom,
            r = Math.min(w, h) / 2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20(); //category20c()

        let svg = d3
            .select(element)
            .append('svg')
            .data([data])
            .attr('width', w + padding.left + padding.right)
            .attr('height', h + padding.top + padding.bottom);

        var container = svg
            .append('g')
            .attr('class', 'chartholder')
            .attr(
                'transform',
                'translate(' +
                    (w / 2 + padding.left) +
                    ',' +
                    (h / 2 + padding.top) +
                    ')'
            );

        var vis = container.append('g');

        var pie = d3.layout
            .pie()
            .sort(null)
            .value(function (d) {
                return 1;
            });

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis
            .selectAll('g.slice')
            .data(pie)
            .enter()
            .append('g')
            .attr('class', 'slice');

        arcs.append('path')
            .attr('fill', function (d, i) {
                return color(i);
            })
            .attr('d', function (d) {
                return arc(d);
            });

        // add the text
        arcs.append('text')
            .attr('transform', function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return (
                    'rotate(' +
                    ((d.angle * 180) / Math.PI - 90) +
                    ')translate(' +
                    (d.outerRadius - 10) +
                    ')'
                );
            })
            .attr('text-anchor', 'end')
            .text(function (d, i) {
                return data[i].label;
            });

        container.on('click', spin);

        //make arrow
        svg.append('g')
            .attr(
                'transform',
                'translate(' +
                    (w + padding.left + padding.right) +
                    ',' +
                    (h / 2 + padding.top) +
                    ')'
            )
            .append('path')
            .attr(
                'd',
                'M-' + r * 0.15 + ',0L0,' + r * 0.05 + 'L0,-' + r * 0.05 + 'Z'
            )
            .style({ fill: 'black' });

        //draw spin circle
        container
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 60)
            .style({ fill: 'white', cursor: 'pointer' });

        //spin text
        container
            .append('text')
            .attr('x', 0)
            .attr('y', 15)
            .attr('text-anchor', 'middle')
            .text('SPIN')
            .style({ 'font-weight': 'bold', 'font-size': '30px' });

        if (sessionStorage.getItem('oldpick')) {
            const oldArray = JSON.parse(sessionStorage.getItem('oldpick'));
            oldpick.push(...oldArray);
        }

        oldpick.forEach((ele) => {
            d3.select(
                lwcThis.template.querySelector(
                    '.slice:nth-child(' + (ele + 1) + ') path'
                )
            ).attr('fill', '#ccc');
        });

        function spin(d) {
            container.on('click', null);

            if (oldpick.length === data.length) {
                container.on('click', null);
                return;
            }

            let ps = 360 / data.length,
                pieslice = Math.round(1440 / data.length),
                rng = Math.floor(Math.random() * 1440 + 360);

            rotation = Math.round(rng / ps) * ps;

            picked = Math.round(data.length - (rotation % 360) / ps);
            picked = picked >= data.length ? picked % data.length : picked;

            if (oldpick.indexOf(picked) !== -1) {
                d3.select(this).call(spin);
                return;
            }
            oldpick.push(picked);

            sessionStorage.setItem('oldpick', JSON.stringify(oldpick));

            rotation += 90 - Math.round(ps / 2);

            vis.transition()
                .duration(3000)
                .attrTween('transform', rotTween)
                .each('end', () => {
                    //mark question as seen
                    d3.select(
                        lwcThis.template.querySelector(
                            '.slice:nth-child(' + (picked + 1) + ') path'
                        )
                    ).attr('fill', '#ccc');

                    const pickedVal = data[picked].value;
                    const wordsList = data.filter((el) => {
                        // eslint-disable-next-line eqeqeq
                        return el.value == pickedVal;
                    });
                    setTimeout(() => {
                        fetch(
                            '/api/sendquestiontoclient?gameObj=' +
                                encodeURIComponent(JSON.stringify(wordsList[0]))
                        )
                            .then((response) => response.json())
                            .then((res) => {
                                if (res) {
                                    //populate question
                                    const event = new CustomEvent(
                                        'stagechange',
                                        {
                                            detail: {
                                                stage: 'GAME',
                                                gameObj: wordsList[0]
                                            }
                                        }
                                    );
                                    lwcThis.dispatchEvent(event);
                                }
                            });
                    }, 3000);

                    oldrotation = rotation;

                    container.on('click', spin);
                });
        }

        function rotTween(to) {
            var i = d3.interpolate(oldrotation % 360, rotation);
            return function (t) {
                return 'rotate(' + i(t) + ')';
            };
        }
    }
}
