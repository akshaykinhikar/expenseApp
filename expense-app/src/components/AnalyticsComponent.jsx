import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



// for (var i = 0; i < 10; i++) {
//     console.log(random_rgba())
// }    

const AnalyticsComponent = (props) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });


    function random_rgba(opacity) {
        let o = Math.round, r = Math.random, s = 255;

        let last = opacity ? opacity : r().toFixed(1);

        return 'rgba('
            + o(r() * s)
            + ','
            + o(r() * s)
            + ','
            + o(r() * s)
            + ','
            + last
            + ')'
    }

    useEffect(() => {
        data.labels = [];
        data.datasets[0].backgroundColor = [];
        data.datasets[0].borderColor = [];
        data.datasets[0].data = [];
        props.expenseSummary && props.expenseSummary.memShares &&
            props.expenseSummary.memShares.length > 0 && props.expenseSummary.memShares.map(share => {
                data.labels.push(share.member.label);
                let bgColor = random_rgba(0.5);
                let borderColor = random_rgba(1);
                let expense = share.totalExpenseByMember ? share.totalExpenseByMember : 0;

                data.datasets[0].backgroundColor = [...data.datasets[0].backgroundColor, bgColor];
                data.datasets[0].borderColor = [...data.datasets[0].borderColor, borderColor];
                data.datasets[0].data = [...data.datasets[0].data, expense]
            })
        setData(data);
        console.log("data", data, props)


    }, [])


    return (
        <>
            <h4 className='mt-5'>Analytics component</h4>
            {data?.datasets[0]?.data?.length > 0 && <Doughnut data={data} />}
            {/* {data?.datasets[0]?.data?.length > 0 && <Pie data={data} />} */}
        </>
    )
}

export default AnalyticsComponent
